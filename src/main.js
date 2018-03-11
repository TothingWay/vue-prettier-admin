import Vue from 'vue'
import App from './App'
import router from './router'
// vuex
import store from './store'
// makes browsers render all elements more consistently
import 'normalize.css'
import 'base/icon'
// 引入elementUI自定义主题色
// import './common/scss/element-variables.scss'

// 按需引入elementUI
import { Form, FormItem, Input, Icon, Button } from 'element-ui'

// 按需引入collapse过度组件
// import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
// Vue.component(CollapseTransition.name, CollapseTransition)

// 注册按需引入的elementUI组件
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Button)

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
