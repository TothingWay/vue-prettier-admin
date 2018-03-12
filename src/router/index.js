import Vue from 'vue'
import Router from 'vue-router'
import { loadLogin } from 'common/js/cache.js'

Vue.use(Router)

const Login = () => import('base/login/Login')
const Dashboard = () => import('base/dashboard/Dashboard')
const notFound = () => import('base/404/404')

// 判断是否登录
const isLogin = Object.keys(loadLogin()).length ? '/dashboard' : '/login'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: to => {
        return isLogin
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/dashboard',
      component: Dashboard
    },
    {
      path: '/404',
      component: notFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
