import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, setAuth, clearAuth } from '@/utils/auth'
import util from '@/utils/util'
import request from '@/utils/request'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 读取存储的凭证
    auth: util.toObject(getAuth()),
    // 我的mind信息 favorite
  },
  mutations: {
    /**
     * 用户
     * @param {Object} auth 
     * @desc 用户登陆赋值给vuex ,同时用cookie 本地存储
     */
    login(state, { token, userInfo, save }) {
      setAuth({ token, userInfo }, save)
      state.auth = { token, userInfo };
    },
    logout(state) {
      clearAuth();
      state.auth = {};
    },
  },
  actions: {
    /**
     * 获取收藏夹
     * @param {Object} state
     * store.dispatch('get_favorite', { amount: 10 })
     */
    // get_favorite({ commit, dispatch,state }) {
    //   return request({
    //     url: '/favorite',
    //     method: 'get',
    //     data: this.form
    //   })
    // }
  },
  getters: {
    token(state, getters) {
      return state.auth.token
    },
    userInfo(state, getters) {
      return util.toObject(state.auth.userInfo)
    },
  }
})
