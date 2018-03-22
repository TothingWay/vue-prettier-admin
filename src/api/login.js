import request from 'utils/request'

export function login (username, password) {
  /* const data = {
    username,
    password
  } */
  return request({
    url: '/login/cellphone',
    method: 'get',
    params: {
      // 测试参数
      phone: username,
      // username,
      password
    }
  })
}

export function getUserInfo (token) {
  /* const data = {
    username,
    password
  } */
  return request({
    url: '/user/detail',
    method: 'get',
    params: {
      // 测试参数
      uid: token
      // token
    }
  })
}
