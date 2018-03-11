import Vue from 'vue'
import Router from 'vue-router'
// import { loadLogin } from 'common/js/cache.js'

Vue.use(Router)

const Login = () => import('base/login/Login')
const Dashboard = () => import('base/dashboard/Dashboard')

// 判断是否登录
// const isLogin = Object.keys(loadLogin()).length ? '/dashboard' : '/login'

export default new Router({
  routes: [
    {
      path: '/'
      /* redirect: to => {
        return isLogin
      } */
      // component: Dashboard
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/dashboard',
      component: Dashboard
    }
  ]
})
