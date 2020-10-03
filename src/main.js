import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import antd from 'ant-design-vue'
import router from "./router";
import store from "./store";
import 'ant-design-vue/dist/antd.css'

import 'normalize.css/normalize.css'

createApp(App)
  .use(store)
  .use(router)
  .use(antd)
  .mount('#app')
