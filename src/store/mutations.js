import * as types from './mutation-types'

const mutations = {
  [types.SET_ACCOUNT] (state, account) {
    state.account = account
  }
}
export default mutations
