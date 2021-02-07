// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ViewUI from 'view-design'
import store from '@/store/index'
import 'view-design/dist/styles/iview.css'
import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(ViewUI)
/* eslint-disable no-new */
console.log('env',process.env.NODE_ENV,process.env.BASE_API)

//根据环境匹配api地址
axios.defaults.baseURL = process.env.BASE_API
//请求超时时间
axios.defaults.timeout = 10000 //超时10秒

axios.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'JWT ' + localStorage.token
  }
  return config
}, error => {
  return Promise.reject(error)
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
