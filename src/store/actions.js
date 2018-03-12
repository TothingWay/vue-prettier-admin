import * as types from './mutation-types'
import api from '../api/index'
export const login = function ({ commit }, userInfo) {
  const username = userInfo.username.trim()
  return api.login(username, userInfo.password)
    .then((res) => {
      commit(types.SET_ACCOUNT, res.data)
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
}
