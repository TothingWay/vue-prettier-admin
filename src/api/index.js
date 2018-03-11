import axios from 'axios'
import url from './config'

axios.defaults.baseURL = 'http://www.tothingway.me'

export default {
  /*
    @method 登录
    @param: username
    @param: password
   */
  login () {
    return axios({
      method: 'post',
      url: url.login,
      data: {
        username: 'admin',
        password: 'admin'
      }
    })
  }
}
