import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const { login } = response
          if (login[username.trim()]) {
            commit('SET_TOKEN', login[username.trim()].token)
            setToken(login[username.trim()].token)
            resolve()
          } else {
            reject('账号密码错误')
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { users } = response

          if (!users[state.token]) {
            reject('Verification failed, please Login again.')
          }

          const { name, introduction, roles } = users[state.token]

          commit('SET_NAME', name)
          commit('SET_INTRODUCTION', introduction)
          commit('SET_ROLES', roles)
          resolve(users[state.token])
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      commit('permission/SET_ROUTES', [], { root: true })
      resetRouter()
      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { routers } = await dispatch('getInfo')
    resetRouter()
    commit('permission/SET_ROUTES', [], { root: true })

    // generate accessible routes map
    const accessRoutes = await dispatch('permission/generateRoutes', routers, {
      root: true
    })

    // dynamically add accessible routes
    accessRoutes.forEach(route => {
      router.addRoute(route)
    })

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
