import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from 'store'
import i18n from './lang' // Internationalization
import ElementLocale from 'element-ui/lib/locale'
import './plugins/element.js'
import 'normalize.css/normalize.css'
import './mock' // simulation data
import 'icons' // icon
import './permission'

import permission from '@/directive/permission/index.js' // 权限判断指令
import Scroll from '@/components/Scroll/scroll'
import Container from '@/components/container'
Vue.component('scroll', Scroll)
Vue.component('container', Container)
Vue.directive('permission', permission)
Vue.config.productionTip = false
ElementLocale.i18n((key, value) => i18n.t(key, value))

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
