import Vue from 'vue'
import Router from "vue-router";
import {routers} from "./routers";
import store from "../store/index";

Vue.use(Router)

//消除重复路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export const router = new Router({
  mode: 'history',
  routes: routers
})

router.beforeEach((to, from, next) => {
  let now = new Date()
  if (!['websites','login', '404'].includes(to.name)) {
    if (localStorage.token) {
      store.commit('decodeToken') //刷新页面vuex的token数据会丢失，在这里重新从localstorge获取值
      if (store.state.expire >= now) {
        next()
      } else {
        router.push({name: 'login'})
      }
    } else {
      router.push({name: 'login'})
    }
  } else {
    next()
  }
})

router.afterEach()

export default router
