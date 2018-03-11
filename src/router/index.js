import Vue from 'vue'
import Router from 'vue-router'
import { loadLogin } from 'common/js/cache.js'
const Login = () => import('base/login/Login.vue')

Vue.use(Router)

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
      name: 'login',
      component: Login
    }
  ]
})
