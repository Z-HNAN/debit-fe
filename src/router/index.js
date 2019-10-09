import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/index'

import WorkNew from '@/components/work/new'
import WorkList from '@/components/work/list'
import WorkReport from '@/components/work/report'
import WorkDetail from '@/components/work/detail'

import ManageManagers from '@/components/manage/managers'
import ManageEmployee from '@/components/manage/employee'
import ManageDepartments from '@/components/manage/departments'
import ManageSetting from '@/components/manage/setting'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: {name: 'index'}},
    /* 首页相关 */
    {name: 'index', path: '/index', component: Index},
    
    /* 岗位相关 */
    {name: 'work.new', path: '/work/new', component: WorkNew},
    {name: 'work.list', path: '/work/list', component: WorkList},
    {name: 'work.report', path: '/work/report', component: WorkReport},
    {name: 'work.detail', path: '/work/detail/:work_id', component: WorkDetail},
    
    /* 管理相关 */
    {name: 'manage.managers', path: '/manage/managers', component: ManageManagers},
    {name: 'manage.employee', path: '/manage/employee', component: ManageEmployee},
    {name: 'manage.departments', path: '/manage/departments', component: ManageDepartments},
    {name: 'manage.setting', path: '/manage/setting', component: ManageSetting}

  ]
})
