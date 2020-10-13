import { createApp } from 'vue'
import App from './App.vue'
import antd from 'ant-design-vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import 'normalize.css/normalize.css'
import Icon from '/@/components/Icon/index.vue'
// scrollbar style
import './styles/scrollbar.scss'

import './permission' // permission control

createApp(App)
  .use(store)
  .use(router)
  .use(antd)
  .component('Icon', Icon)
  .mount('#app')
