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
  // tagsView
  [types.ADD_VISITED_VIEW] (state, view) {
    if (state.tagsView.visitedViews.some(v => v.path === view.path)) return
    state.tagsView.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || '未命名'
      })
    )
  },
  [types.ADD_CACHED_VIEW] (state, view) {
    if (state.tagsView.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.tagsView.cachedViews.push(view.name)
    }
  },
  [types.DEL_VISITED_VIEW] (state, view) {
    for (const [i, v] of state.tagsView.visitedViews.entries()) {
      if (v.path === view.path) {
        state.tagsView.visitedViews.splice(i, 1)
        break
      }
    }
  },
  [types.DEL_CACHED_VIEW] (state, view) {
    for (const i of state.tagsView.cachedViews) {
      if (i === view.name) {
        const index = state.tagsView.cachedViews.indexOf(i)
        state.tagsView.cachedViews.splice(index, 1)
        break
      }
    }
  },
  [types.DEL_OTHERS_VISITED_VIEWS] (state, view) {
    for (const [i, v] of state.tagsView.visitedViews.entries()) {
      if (v.path === view.path) {
        state.tagsView.visitedViews = state.tagsView.visitedViews.slice(i, i + 1)
        break
      }
    }
  },
  [types.DEL_OTHERS_CACHED_VIEWS] (state, view) {
    for (const i of state.tagsView.cachedViews) {
      if (i === view.name) {
        const index = state.tagsView.cachedViews.indexOf(i)
        state.tagsView.cachedViews = state.tagsView.cachedViews.slice(index, index + 1)
        break
      }
    }
  },
  [types.DEL_ALL_VISITED_VIEWS] (state) {
    state.tagsView.visitedViews = []
  },
  [types.DEL_ALL_CACHED_VIEWS] (state) {
    state.tagsView.cachedViews = []
  },
  [types.UPDATE_VISITED_VIEW] (state, view) {
    for (let v of state.tagsView.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}
export default mutations
