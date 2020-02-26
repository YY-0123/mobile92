import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
// 导入路由，使得可以执行路由跳转
import router from '@/router/index.js'

// 创建一个axios实例 和原来的axios没有关系
const instance = axios.create({
  // 请求根地址
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 请求完毕的数据【转换器】，超大整型数字多转换处理的
  transformResponse: [function (data) {
    // JSON.parse(字符串)
    // data的返回形式有两种
    // 1. 实体字符串
    // 2. 空字符串(不能转的)
    // JSONbig.parse针对大整型进行处理，其他信息不给处理
    // if (data) {
    //   return JSONBig.parse(data)
    // }
    // return data

    // 升级上述代码
    try {
      // 报错，就说明data是空字符串，parse处理不来，会被catch捕捉处理
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
})
// 配置【请求拦截器】
instance.interceptors.request.use(function (config) {
  // 判断token存在再做配置(vuex判断)
  // store.user.token 根据是否有值，就知道用户是否登录系统
  if (store.state.user.token) {
    // 注意：token前边有 'Bearer ' 的信息前缀
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 配置【响应拦截器】
instance.interceptors.response.use(function (response) {
  // 正常响应处理
  // 有时返回data、有时返回data.data
  try {
    // data.data如果报错，没有获得到，错误信息会被catch步骤，就走data了
    return response.data.data
  } catch (err) {
    return response.data
  }
}, async function (error) {
  // 非正常响应处理(包括401)
  // console.dir(error) // 对象： config request response isAxiosError toJSON
  if (error.response && error.response.status === 401) {
    // token不ok(token在服务器端已经失效了，2个小时时效)
    // 强制用户重新登录系统，以刷新服务器端的token时效
    let toPath = {
      name: 'login',
      query: { redirectUrl: router.currentRoute.path }
    }
    // 跳转对象

    // 如果refresh_token不存在
    if (!store.state.user.refresh_token) {
      router.push(toPath)
      return Promise.reject(error)
    }
    try {
      // 刷新用户token
      // 应该发送一个请求 换取新的token
      // 这里不应该再用instance  因为 instance会再次进入拦截器  用默认的axios
      let result = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${store.state.user.refresh_token}`
        }
      })
      // 获取到新token后，就对vuex和localStorage进行更新
      store.commit('updateUser', {
        token: result.data.data.token, // 拿到新的token之后
        refresh_token: store.state.user.refresh_token // 将之前 refresh_token 14天有效期
      })
      return instance(error.config) // 把刚才错误的请求再次发送出去 然后将promise返回
    } catch (err) {
      // 如果错误 表示补救措施也没用了(有可能refresh_token也失效了)
      // 应该跳转到登录页 并且 把废掉的用户信息全都干掉
      store.commit('clearUser') // 所有的用户信息清空
      router.push(toPath) // 跳转到回登录页
      return Promise.reject(err)
    }
  }
  // return new Promise((resolve,reject)=>{
  // reject('获得文章失败！')
  // })
  return Promise.reject(error)
})
export default instance
