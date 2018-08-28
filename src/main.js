import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from 'store'

import 'icons' // icon
import i18n from './lang' // Internationalization
import ElementLocale from 'element-ui/lib/locale'
import './mock' // simulation data
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './permission'
import Scroll from '@/components/Scroll/scroll'
import Container from '@/components/container'
import {
  Button,
  Form,
  FormItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Message,
  Tooltip,
  Tabs,
  TabPane,
  Icon
} from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Tooltip)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Icon)
Vue.component('scroll', Scroll)
Vue.component('container', Container)
Vue.prototype.$message = Message
Vue.prototype.$ELEMENT = {
  size: 'small'
}
ElementLocale.i18n((key, value) => i18n.t(key, value))
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
