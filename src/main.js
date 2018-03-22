import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store'

import 'normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css

import 'icons' // svg-icon
import 'assets/js/permissions.js'

// 按需引入elementUI
import {
  Row,
  Col,
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
  DropdownItem,
  Select,
  Option,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Radio,
  RadioGroup,
  Switch,
  MessageBox,
  Message,
  Popover,
  Tooltip,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Upload
} from 'element-ui'

// 按需引入collapse过度组件
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
Vue.component(CollapseTransition.name, CollapseTransition)

// 注册按需引入的elementUI组件
Vue.use(Row)
Vue.use(Col)
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
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(DatePicker)
Vue.use(Upload)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
