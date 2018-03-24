import request from 'utils/request'

export function login (username, password) {
  /* const data = {
    username,
    password
  } */
  return request({
    url: '',
    method: 'get',
    params: {
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
    url: '',
    method: 'get',
    params: {
      token
    }
  })
}
