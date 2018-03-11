import * as types from './mutation-types'

const mutations = {
  [types.SET_DATA] (state, data) {
    state.data = data
  }
}
export default mutations
