import { getToken } from '../utils/auth'
import { constantRouterMap } from '@/router'
import Cookies from 'js-cookie'

const state = {
  user: {
    name: '',
    token: getToken(),
    roles: [],
    routers: constantRouterMap,
    addRouters: []
  },
  language: Cookies.get('language') || 'en',
  sidebar: {
    opened: !+Cookies.get('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop',
  tabs: {
    pageOpenedList: [],
    pageCachedList: [],
    currentPage: ''
  }
}
export default state
