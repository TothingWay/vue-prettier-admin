import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('@/components/login/login')

export const constantRouterMap = [
  {
    path: '/login',
    component: Login,
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
