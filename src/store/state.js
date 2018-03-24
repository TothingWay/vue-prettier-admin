import { getToken } from '../utils/auth'
import { constantRouterMap } from '@/router'
import Cookies from 'js-cookie'

const state = {
  // 登录与权限
  token: getToken(),
  name: 'admin',
  roles: [],
  routers: constantRouterMap,
  addRouters: [],
  // 导航栏切换
  sidebar: !+Cookies.get('sidebarStatus')
}
export default state
