import { nextTick } from 'vue'
import store from '@/store'
import { isString, isArray } from '@/utils/validate'
import settings from '@/settings'

// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings

function checkNeed() {
  const env = process.env.NODE_ENV
  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}
export const initErrorLog = app => {
  if (checkNeed()) {
    app.config.errorHandler = function(err, vm, info) {
      nextTick(() => {
        store.dispatch('errorLog/addErrorLog', {
          err,
          vm,
          info,
          url: window.location.href
        })
        console.error(err, info)
      })
    }
  }
}
