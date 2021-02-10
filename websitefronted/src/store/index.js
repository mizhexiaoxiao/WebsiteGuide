import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jwt-decode'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    websiteList: [],
    userid: '',
    username: '',
    expire: '',
    token: '',
    is_superuser: null

  },
  mutations: {
    updatewebsiteList(state, val) {
      state.websiteList = val
    },
    updateToken: (state, token) => {
      state.token = token;
      localStorage.token = token
    },
    decodeToken: state => {
      state.userid = jwt(localStorage.token).user_id
      state.expire = new Date(1000 * jwt(localStorage.token).exp)
      state.username = jwt(localStorage.token).username
      state.is_superuser = jwt(localStorage.token).is_superuser
      console.log(state.is_superuser)
    },
    removeStorage: state => {
      localStorage.removeItem('token')
    }
  },
  actions: {
    login: (context, data) => {
      return new Promise((resolve, reject) => {
        axios.post('api/login/', data).then(resp => {
          context.commit('updateToken', resp.data.detail.token)
          context.commit('decodeToken', resp.data.detail.token)
          resolve(resp)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout: context => {
      context.commit('removeStorage')
    },
    getWebsitesList: (context, data) => {
      return new Promise((resolve, reject) => {
        axios.get('api/alldata/', {params:data}).then(resp => {
          context.commit('updatewebsiteList', resp.data)
          resolve(resp)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})

export default store
