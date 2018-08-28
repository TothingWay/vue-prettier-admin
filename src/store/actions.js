import * as types from './mutation-types'
import { setToken, removeToken } from 'utils/auth'
import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { asyncRouterMap } from '@/router'
// import { Message } from 'element-ui'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter (asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

// i18n
export const setLanguage = function ({ commit }, language) {
  commit(types.SET_LANGUAGE, language)
}

// 用户名登录
export const LoginByUsername = function ({ commit }, userInfo) {
  const username = userInfo.username.trim()
  return new Promise((resolve, reject) => {
    loginByUsername(username, userInfo.password).then(response => {
      const data = response.data
      commit(types.SET_TOKEN, data.token)
      setToken(response.data.token)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

// 获取用户信息
export const GetUserInfo = function ({ commit, state }) {
  return new Promise((resolve, reject) => {
    getUserInfo(state.user.token).then(response => {
      if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
        reject(new Error('error'))
      }
      const data = response.data

      if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        commit(types.SET_ROLES, data.roles)
      } else {
        reject(new Error('getInfo: roles must be a non-null array !'))
      }

      commit(types.SET_NAME, data.name)
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

// 登出
export const LogOut = function ({ commit, state }) {
  return new Promise((resolve, reject) => {
    logout(state.user.token).then(() => {
      commit(types.SET_TOKEN, '')
      commit(types.SET_ROLES, [])
      removeToken()
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

// 生成路由
export const GenerateRoutes = function ({ commit }, data) {
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

// 侧边栏切换
export const toggleSideBar = function ({ commit }) {
  commit(types.TOGGLE_SIDEBAR)
}

// 关闭侧边栏
export const closeSideBar = function ({ commit }, { withoutAnimation }) {
  commit(types.CLOSE_SIDEBAR, withoutAnimation)
}

// 设备切换
export const toggleDevice = function ({ commit }, device) {
  commit(types.TOGGLE_DEVICE, device)
}

// tabs
export const currentPageSet = function ({ commit }, name) {
  commit(types.TAB_SET, name)
}

export const addTab = function ({ commit }, tabName) {
  commit(types.ADD_TAB, tabName)
}

export const delTab = function ({ commit, state }, tabName) {
  return new Promise((resolve) => {
    commit(types.DEL_TAB, tabName)
    resolve([...state.tabs.pageOpenedList])
  })
}

export const delOthersTabs = function ({ commit, state }, tabName) {
  return new Promise(resolve => {
    commit(types.DEL_OTHERS_TABS, tabName)
    resolve([...state.tabs.pageOpenedList])
  })
}

export const delAllTabs = function ({ commit, state }) {
  return new Promise(resolve => {
    commit(types.DEL_ALL_TABS)
    resolve([...state.tabs.pageOpenedList])
  })
}
