import Vue from 'vue'
import App from './App.vue'
import './styles/base.less'
import './styles/iconfont.less'
import 'lib-flexible'
import router from './router'
import HmHeader from './components/HmHeader'
import HmLogo from './components/HmLogo'
import HmButton from './components/HmButton'
import HmInput from './components/HmInput'
import axios from 'axios'
import { Toast, Dialog, Button, Field, Radio, RadioGroup, Cell, CellGroup, Uploader, List } from 'vant'
import HmNavbar from './components/HmNavbar.vue'
import moment from 'moment'
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(Button)
Vue.use(List)

Vue.component('hm-input', HmInput)
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)
Vue.component('hm-navbar', HmNavbar)
Vue.filter('date', function (input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.response.use(function (res) {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    router.push('/login')
    Toast.fail(message)
  }
  return res
})
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  config.headers.Authorization = token
  return config
})
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
