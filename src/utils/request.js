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
export default instance