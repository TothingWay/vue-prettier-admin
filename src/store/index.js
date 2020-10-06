import { createStore } from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import errorLog from './modules/errorLog'
import settings from './modules/settings'

export default createStore({
  getters,
  modules: {
    app,
    permission,
    tagsView,
    user,
    errorLog,
    settings
  }
})
