import { constantRoutes } from '@/router'
import { deepClone } from '@/utils'
import path from 'path'
import Layout from '@/layout/index.vue'
import { pathToHump, parseDynamicPath } from '@/utils'
import { defineAsyncComponent } from 'vue'

let filterAsyncRoutesTimes = 0

/**
 * format menu interface
 * @param filterRoutes
 * @param asyncRoutes
 */
export function filterAsyncRoutes(filterRoutes, asyncRoutes) {
  asyncRoutes.forEach(item => {
    const filePath = parseDynamicPath(item.path)
    const menu = {
      path: item.path,
      component:
        filterAsyncRoutesTimes === 0
          ? Layout
          : item.path
          ? defineAsyncComponent(() => import(`@/views${filePath}`))
          : null,
      children: [],
      name: pathToHump(parseDynamicPath(item.path)),
      alwaysShow: item.alwaysShow || false,
      meta: {
        title: item.title || null,
        icon: item.icon || null,
        roles: item.roles || [],
        noCache: item.noCache || false,
        breadcrumb: item.breadcrumb || false,
        affix: item.affix || false,
        activeMenu: item.activeMenu || null
      }
    }
    filterAsyncRoutesTimes += 1
    if (item.children && item.children.length) {
      filterAsyncRoutes(menu.children, item.children)
    }
    if (!menu.children.length) {
      delete menu.children
    }
    filterRoutes.push(menu)
    return asyncRoutes
  })
}

// The degraded route is a secondary route to solve the keep-alive caching problem
export const getFlatRoutes = routes => {
  const routers = routes.map(child => {
    if (child.children && child.children.length > 0) {
      child.children = formatRouter(child.children, child.path, [], child)
    }
    return child
  })
  routers.forEach(item => {
    item.component = Layout
  })
  return routers
}

const formatRouter = (routes, basePath = '/', list = [], parent) => {
  routes.map(item => {
    item.path = path.resolve(basePath, item.path)
    const meta = item.meta || {}
    if (!meta.parent && parent) {
      meta.parent = parent.path
      item.meta = meta
    }
    if (item.redirect) item.redirect = path.resolve(basePath, item.redirect)
    if (item.children && item.children.length > 0) {
      const arr = formatRouter(item.children, item.path, list, item)
      delete item.children
      list.concat(arr)
    }
    list.push(item)
  })
  return list
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, asyncRoutes) {
    return new Promise(resolve => {
      const Routes = []
      filterAsyncRoutes(Routes, asyncRoutes)
      const flatRoutes = getFlatRoutes(deepClone(Routes))

      commit('SET_ROUTES', Routes)

      resolve(
        flatRoutes.concat({
          path: '/:path(.*)*',
          redirect: '/home',
          hidden: true
        })
      )
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
