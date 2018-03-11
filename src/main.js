import Vue from 'vue'
import App from './App'
import router from './router'
// vuex
import store from './store'
// makes browsers render all elements more consistently
import 'normalize.css'
// icon
import 'base/icon'

// 引入elementUI自定义主题色
// import './common/scss/element-variables.scss'

// 按需引入elementUI
import {
  Form,
  FormItem,
  Input,
  Icon,
  Button,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui'

// 挂载axios到vue原型上
import api from './api/index'
Vue.prototype.axios = api

// 按需引入collapse过度组件
// import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
// Vue.component(CollapseTransition.name, CollapseTransition)

// 注册按需引入的elementUI组件
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

// 调整elementUI组件大小
// Vue.prototype.$ELEMENT = { size: 'small' }

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
