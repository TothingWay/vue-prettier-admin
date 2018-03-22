import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('@/components/login/login')
const layout = () => import('@/base/layout/layout')
const page401 = () => import('@/base/errorPage/401')
const page404 = () => import('@/base/errorPage/404')

export const constantRouterMap = [
  {
    path: '/login',
    component: Login
  }, {
    path: '/',
    component: layout,
    meta: {
      roles: ['admin', 'editor']
    }
  }, {
    path: '/404',
    component: page404,
    meta: {
      roles: ['admin', 'editor']
    }
  }, {
    path: '/401',
    component: page401,
    meta: {
      roles: ['admin', 'editor']
    }
  }
]

export default new Router({
  routes: constantRouterMap
})

export const asyncRouterMap = [
]
