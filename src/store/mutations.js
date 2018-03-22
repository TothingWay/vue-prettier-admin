import * as types from './mutation-types'
import { constantRouterMap } from '@/router'

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
  }
}
export default mutations
