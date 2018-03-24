import * as types from './mutation-types'
import { constantRouterMap } from '@/router'
import Cookies from 'js-cookie'

const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_ROLES] (state, roles) {
    state.roles = roles
  },
  [types.SET_NAME] (state, name) {
    state.name = name
  },
  [types.SET_ROUTERS] (state, routers) {
    state.addRouters = routers
    state.routers = constantRouterMap.concat(routers)
  },
  [types.TOGGLE_SIDEBAR] (state) {
    if (state.sidebar) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar = !state.sidebar
  }
}
export default mutations
