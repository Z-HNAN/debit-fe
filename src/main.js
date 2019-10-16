import Vue from 'vue'
import App from './App'
import router from './router'

/* 引入vuex */
/* import Store from './store/store' */
/* 引入axios */
import Axios from 'axios'
/* 引入nprogress */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/* 引入echarts */
import echarts from 'echarts'

/* 引入font-aweome */
import 'font-awesome/css/font-awesome.css'

/* ========= 引入全局组件 ======= */
import NavMenu from './components/navMenu.vue'
import HeadMenu from './components/headMenu.vue'
/* ======= 引入全局组件 结束======= */

/* ======= 引入 ElementUI ======= */

/* 引入css */
import 'element-ui/lib/theme-chalk/index.css'
/* 引入组件 */
import ElementUI from 'element-ui'

/* 引入自定义css文件 */
import './assets/css/index.css'
import './assets/css/button.css'

Vue.use(ElementUI)
/* ======= 结束 ElementUI ======= */

/* ========= 使用全局组件 ======= */
Vue.component('nav-menu', NavMenu)
Vue.component('head-menu', HeadMenu)
/* ======= 使用全局组件 结束======= */

/* 引入axios */
Vue.prototype.$ajax = Axios // vue中使用
/* 引入echarts */
Vue.prototype.$echarts = echarts

Axios.defaults.baseURL = 'http://94.191.90.221:8000/eolinker_os/Mock/simple?projectID=1&uri='
// 设置axios的loading
Axios.interceptors.request.use(function (config) {
  // 请求开始
  NProgress.start()
  return config
})
Axios.interceptors.response.use(function (config) {
  // 请求结束
  NProgress.done()
  return config
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
