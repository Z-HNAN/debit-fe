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
import FindDay from './Find/dayRecord.vue'
import FindMonth from './Find/monthRecord.vue'
import FindYear from './Find/yearRecord.vue'

/**
 * 账户显示
 */
import Share from './Share/index.vue'

/**
 * 账户统计
 */
import Statistics from './Statistics/index.vue'
import StatisticDay from './Statistics/dayStatistic.vue'
import StatisticMonth from './Statistics/monthStatistic.vue'
import StatisticYear from './Statistics/yearStatistic.vue'

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

/**
 * 用户设置
 */
import User from './User/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: {
      name: 'Index'
    }
  },

  /* Index */
  {
    name: 'Index',
    path: '/index',
    component: Index
  },

  /* Find */
  {
    name: 'Find',
    path: '/find',
    component: Find,
    redirect: '/find/day',
    children: [{
      path: '/find/day',
      name: 'Find.Day',
      component: FindDay
    },
    {
      path: '/find/month',
      name: 'Find.Month',
      component: FindMonth
    },
    {
      path: '/find/year',
      name: 'Find.Year',
      component: FindYear
    }
    ]
  },

  /* Share */
  {
    name: 'Share',
    path: '/share',
    component: Share
  },

  /* Statistics */
  {
    name: 'Statistics',
    path: '/statistics',
    component: Statistics,
    redirect: '/statistic/day',
    children: [{
      name: 'Statistic.Day',
      path: '/statistic/day',
      component: StatisticDay
    },
    {
      name: 'Statistic.Month',
      path: '/statistic/month',
      component: StatisticMonth
    },
    {
      name: 'Statistic.Year',
      path: '/statistic/year',
      component: StatisticYear
    }
    ]
  },

  /* Set */
  {
    name: 'Set.Create',
    path: '/set/create',
    component: SetCreate
  },
  {
    name: 'Set.Add',
    path: '/set/add',
    component: SetAdd
  },

  /* User */
  {
    name: 'User',
    path: '/user',
    component: User
  }
  ]
})
