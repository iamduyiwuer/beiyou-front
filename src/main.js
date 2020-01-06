import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
// 设置 axios 请求根路径
// axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.defaults.baseURL = 'http://127.0.0.1:9001/'

// 拦截器，对每个请求进行预处理
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 把 axios 挂在到Vue的原型对象上
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
