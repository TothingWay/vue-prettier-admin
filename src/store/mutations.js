import * as types from './mutation-types'
import { constantRouterMap } from '@/router'
import Cookies from 'js-cookie'

const mutations = {
  [types.SET_LANGUAGE] (state, language) {
    state.language = language
    Cookies.set('language', language)
  },
  [types.SET_NAME] (state, name) {
    state.user.name = name
  },
  [types.SET_TOKEN] (state, token) {
    state.user.token = token
  },
  [types.SET_ROLES] (state, roles) {
    state.user.roles = roles
  },
  [types.SET_ROUTERS] (state, routers) {
    state.user.addRouters = routers
    state.user.routers = constantRouterMap.concat(routers)
  },
  [types.TOGGLE_SIDEBAR] (state) {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  [types.OPEN_SIDEBAR] (state) {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = true
    state.sidebar.withoutAnimation = false
  },
  [types.CLOSE_SIDEBAR] (state, withoutAnimation) {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  [types.TOGGLE_DEVICE] (state, device) {
    state.device = device
  },
  [types.TAB_SET] (state, name) {
    state.tabs.currentPage = name
  },
  [types.ADD_TAB] (state, tab) {
    if (state.tabs.pageOpenedList.some(v => v.path === tab.path)) return
    state.tabs.pageOpenedList.push(Object.assign({}, tab, {
      title: tab.meta.title
    }))
    if (!tab.meta.noCache) {
      state.tabs.pageCachedList.push(tab.name)
    }
  },
  [types.DEL_TAB] (state, tabName) {
    for (const [i, v] of state.tabs.pageOpenedList.entries()) {
      if (v.name === tabName) {
        state.tabs.pageOpenedList.splice(i, 1)
        break
      }
    }
    for (const i of state.tabs.pageCachedList) {
      if (i === tabName) {
        const index = state.tabs.pageCachedList.indexOf(i)
        state.tabs.pageCachedList.splice(index, 1)
        break
      }
    }
  },
  [types.DEL_OTHERS_TABS] (state, tabName) {
    for (const [i, v] of state.tabs.pageOpenedList.entries()) {
      if (v.name === tabName) {
        state.tabs.pageOpenedList = state.tabs.pageOpenedList.slice(i, i + 1)
        break
      }
    }
    for (const i of state.tabs.pageCachedList) {
      if (i === tabName) {
        const index = state.tabs.pageCachedList.indexOf(i)
        state.tabs.pageCachedList = state.tabs.pageCachedList.slice(index, index + 1)
        break
      }
    }
  },
  [types.DEL_ALL_TABS] (state) {
    state.tabs.pageOpenedList = []
    state.tabs.pageCachedList = []
  }
}
export default mutations
