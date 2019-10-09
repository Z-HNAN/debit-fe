import {
  MANAGERS,
  DEPARTMENTS
} from './mutation-type'

/* 引入axios */
import Axios from 'axios'
/* 配置axios */
Axios.defaults.baseURL = 'https://mockapi.eolinker.com/retjg4X8a06589ab2ae1963698b53d0d60a76a70d52413a'
Axios.interceptors.request.use(function (config) {
  // 请求开始
  return config
})
Axios.interceptors.response.use(function (config) {
  // 请求结束
  return config
})

export default {
  
  getManagers ({commit, state}) { // 获取所有的用工联系人
    return new Promise(resolve => {
      // if (state.managers.length > 0) { return resolve() } 
      Axios.get('/managers').then(res => {
        commit(MANAGERS, res.data)
        resolve()
      })
    })
  },
  
  getDepartments ({commit, state}) { // 获取所有的部门信息
    return new Promise(resolve => {
      // if (state.departments.length > 0) { return resolve() }
      Axios.get('/departments').then(res => {
        commit(DEPARTMENTS, res.data)
        resolve()
      })
    })
  }
}
