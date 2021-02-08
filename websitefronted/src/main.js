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
// axios.defaults.baseURL = process.env.BASE_API
let protocol = window.location.protocol; //协议
let host = window.location.host; //主机
let reg = /^localhost+/;
if (reg.test(host)) {
  //若本地项目调试使用
  axios.defaults.baseURL = 'http://127.0.0.1:8000';
} else {
  //动态请求地址             协议               主机
  axios.defaults.baseURL = protocol + "//" + host + ":80";
}
//请求超时时间
axios.defaults.timeout = 10000 //超时10秒

let protocol = window.location.protocol; //协议
let host = window.location.host;
axios.defaults.baseURL = protocol + "//" + host  +":80";

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
