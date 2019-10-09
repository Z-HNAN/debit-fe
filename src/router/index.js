import Vue from 'vue'
import Router from 'vue-router'

import Index from './index.vue'

import Modal1Page1 from './modal1/page1'
import Modal1Page2 from './modal1/page2'

import Modal2Page1 from './modal2/page1'
import Modal2Page2 from './modal2/page2'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: { name: 'index' } },
    /* 首页相关 */
    { name: 'index', path: '/index', component: Index },

    /* modal1 */
    { name: 'modal1.page1', path: '/modal1/page1', component: Modal1Page1 },
    { name: 'modal1.page2', path: '/modal1/page2', component: Modal1Page2 },

    /* modal2 */
    { name: 'modal2.page1', path: '/modal2/page1', component: Modal2Page1 },
    { name: 'modal2.page2', path: '/modal2/page2', component: Modal2Page2 }

  ]
})
