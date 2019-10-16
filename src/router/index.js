import Vue from 'vue'
import Router from 'vue-router'

/**
 * 总览
 */
import Index from './Index/index.vue'

/**
 * 个人账单
 */
import Find from './Find/index.vue'

/**
 * 账户显示
 */
import Share from './Share/index.vue'

/**
 * 账户统计
 */
import Statistics from './Statistics/index.vue'

/**
 * 账户设置
 * Set
 */
/**
 * 创建账户
 */
import SetCreate from './Set/Create/index.vue'
/**
 * 记一笔账
 */
import SetAdd from './Set/Add/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: { name: 'index' } },

    /* Index */
    { name: 'Index', path: '/index', component: Index },

    /* Find */
    { name: 'Find', path: '/find', component: Find },

    /* Share */
    { name: 'Share', path: '/share', component: Share },

    /* Statistics */
    { name: 'Statistics', path: '/statistics', component: Statistics },

    /* Set */
    { name: 'Set.Create', path: '/set/create', component: SetCreate },
    { name: 'Set.Add', path: '/set/add', component: SetAdd }
  ]
})
