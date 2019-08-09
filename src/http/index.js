import axios from 'axios'
import router from '../router'
import store from '../store'
import { Notification } from 'element-ui'

// var domain = document.domain.split('.')
// axios 配置
// axios.defaults.host = 'http://192.168.1.96:8110'
// axios.defaults.host = 'http://channelsale.sunton.cn'
// axios.defaults.host = 'http://channel.mooshine.cn'

axios.defaults.timeout = 25000
axios.defaults.host = 'http://mall.suboweb.com'

// axios.defaults.host = 'http://channel.mooshine.cn'// axios.defaults.host = 'http://192.168.1.233:85'
// axios.defaults.host = `http://${domain[0].substr(0, domain[0].length - 1)}.${domain.splice(1).join('.')}`

axios.defaults.baseURL = axios.defaults.host + '/Api'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    store.dispatch('toggleLoading')
    store.dispatch('account/getAccessToken')
    if (store.state.account.access_token) {
      config.headers['access-token'] = `${store.state.account.access_token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    store.dispatch('toggleLoading')
    return response
  },
  error => {
    store.dispatch('toggleLoading')
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // console.log(router.currentRoute)
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.path }
          })
          break
        case 400:
          Notification({
            title: '失败',
            message: error.response.data.message,
            type: 'error'
          })
          break
        case 500:
          Notification({
            title: '出错',
            message: '服务器出错',
            type: 'error'
          })
          break
      }
    }
    return Promise.reject(error.response)
  }
)

export default axios
