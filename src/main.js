import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'amfe-flexible/index.min.js'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import '@/assets/css/global.less' // 引入全局的自定义样式  因为要覆盖vant的样式
import '@/utils/validate.js'
Vue.use(Vant)
Vue.use(Lazyload) // 注册懒加载指令
// 创建一个延迟器，
// 给Vue增加继承成员，名称$sleep，也可以自定义为其他
Vue.prototype.$sleep = time => {
  // 返回一个Promise对象，应用端可以设置async/await使得异步变为同步
  // ，同步可以使得后续代码都按照先后顺序执行
  return new Promise((resolve) => {
    // 定时器，规定在多久之后做一点事情，可以设定当前的延迟器等待的时间
    window.setTimeout(() => {
      // 该resolve()没有任何实质数据，应用端也不用接受
      resolve()
    }, time)
  })
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
