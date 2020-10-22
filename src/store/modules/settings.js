// import variables from '/@/styles/element-variables.scss'
import defaultSettings from '/@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

import { getTagsView, setTagsView, getFixedHeader, setFixedHeader, getSidebarLogo, setSidebarLogo } from '/@/utils/auth'

const state = {
  // theme: variables.theme,
  showSettings: showSettings,
  tagsView: getTagsView() === undefined ? tagsView : getTagsView() === 'true',
  fixedHeader: getFixedHeader() === undefined ? fixedHeader : getFixedHeader() === 'true',
  sidebarLogo: getSidebarLogo() === undefined ? sidebarLogo : getSidebarLogo() === 'true'
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      if (key === 'fixedHeader') {
        setFixedHeader(value)
      } else if (key === 'tagsView') {
        setTagsView(value)
      } else if (key === 'sidebarLogo') {
        setSidebarLogo(value)
      }
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

