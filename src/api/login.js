import request from 'utils/request'

export function login (username, password) {
  /* const data = {
    username,
    password
  } */
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
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
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}
