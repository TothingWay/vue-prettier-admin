import { getToken } from '../utils/auth'
import { constantRouterMap } from '@/router'
const state = {
  token: getToken(),
  name: '',
  roles: [],
  routers: constantRouterMap,
  addRouters: []
}
export default state
