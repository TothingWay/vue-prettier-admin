import axios from 'axios'
// import { Message } from 'element-ui'
import store from 'store'
import { getToken } from 'utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin', // api的base_url
  timeout: 5000 // request timeout
})

service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['token'] = getToken() // 让每个请求携带token
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

export default service
