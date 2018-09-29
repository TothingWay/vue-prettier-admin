import Vue from 'vue'
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
  Icon,
  Scrollbar,
  Table,
  TableColumn
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
Vue.use(Icon)
Vue.use(Scrollbar)
Vue.use(Table)
Vue.use(TableColumn)

Vue.prototype.$message = Message

Vue.prototype.$ELEMENT = {
  size: 'small'
}
