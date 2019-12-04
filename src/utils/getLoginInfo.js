/**
 * 获得当前登录用户的信息
 * const loginInfo = getLoginInfo()
 */
const getLoginInfo = () => {
  const loginInfoString = sessionStorage.getItem('loginInfo') || '{}'
  return JSON.parse(loginInfoString)
}

export default getLoginInfo
