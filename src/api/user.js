import request from '/@/utils/request'

export function login(params) {
  return request({
    url: '/profile',
    method: 'get',
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/profile',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
