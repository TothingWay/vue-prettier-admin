import { createApp } from 'vue'
import App from './App.vue'
import antd from 'ant-design-vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import 'normalize.css/normalize.css'
// icon
import Icon from '/@/components/Icon/index.vue'
// error log
import { initErrorLog } from './utils/error-log'
// scrollbar style
import './styles/scrollbar.scss'
// transition style
import './styles/transition.scss'
// global style
import './styles/index.scss'
// permission control
import './permission'

const vueApp = createApp(App)
  .use(store)
  .use(router)
  .use(antd)
  .component('Icon', Icon)

initErrorLog(vueApp)

vueApp.mount('#app')

