import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store'

import 'normalize.css' // A modern alternative to CSS resets

import '@/styles/variables.scss' // global variables
import '@/styles/mixin.scss' // global mixin
import '@/styles/reset-element-ui.scss' // global element-ui
import '@/styles/index.scss' // global css

import 'icons' // svg-icon
import Wrap from '@/base/layout/wrap'
import 'assets/js/permissions.js'

// 按需引入elementUI
import {
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Button,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Select,
  Breadcrumb,
  BreadcrumbItem,
  Tooltip,
  Card,
  Table,
  TableColumn
} from 'element-ui'

// 按需引入collapse过度组件
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.component('wrap', Wrap)

// 注册按需引入的elementUI组件
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Select)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tooltip)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
