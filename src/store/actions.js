import * as types from './mutation-types'
import { setToken, removeToken } from 'utils/auth'
import { login, getUserInfo } from '@/api/login'
import { asyncRouterMap } from '@/router'
import { filterAsyncRouter } from 'utils/permission'

// 登录页面——登录
export const loginAction = function ({ commit }, userInfo) {
  const username = userInfo.username.trim()
  return new Promise((resolve, reject) => {
    login(username, userInfo.password).then(res => {
      // 测试参数
      const token = res.data.account.id
      // const token = res.headers.token
      setToken('__token__', token) // 登录成功后将token存储在cookie之中
      commit(types.SET_TOKEN, token)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

// 登出
export const logOutAction = function ({ commit }) {
  return new Promise(resolve => {
    commit(types.SET_TOKEN, '')
    commit(types.SET_ROLES, [])
    removeToken()
    resolve()
  })
}

// 获取用户信息
export const getUserInfoAction = function ({ commit, state }) {
  return new Promise((resolve, reject) => {
    getUserInfo(state.token).then(res => {
      if (!res.data) {
        // eslint-disable-next-line
        reject('error')
      }
      const data = res.data
      // 测试数据
      commit(types.SET_ROLES, data.bindings)
      // commit('SET_ROLES', data.roles)
      // commit('SET_NAME', data.name)
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// 动态生成路由
export const generateRoutes = function ({ commit }, data) {
  return new Promise(resolve => {
    const { roles } = data
    let accessedRouters
    if (roles.indexOf('admin') >= 0) {
      accessedRouters = asyncRouterMap
    } else {
      accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
    }
    commit(types.SET_ROUTERS, accessedRouters)
    resolve()
  })
}

// 导航切换
export const toggleSideBar = function ({ commit }) {
  commit(types.TOGGLE_SIDEBAR)
}
