import * as types from '../mutation-types'
import axios from '@/http'
import router from '../../router'
import * as api from '../../api'

const state = {
  access_token: null,
  adminInfo: {},
  siteItem: {}
}

const actions = {
  getSiteProp ({ commit }) {
    axios.post(api.sitePropItem).then(res => {
      commit(types.SITE_ITEM, res.data)
    })
  },
  singIn ({ commit }, data) {
    axios.post(api.login, data).then(res => {
      commit(types.SIGN_IN, res.data)
    })
  },
  getAccessToken ({ commit }) {
    commit(types.GET_ACCESS_TOKEN)
  },
  signOut ({ commit }) {
    commit(types.SIGN_OUT)
  },
  async getAdminInfo ({ commit }) {
    await axios.post(api.currentAdminInfo).then(res => {
      commit(types.GET_ADMIN_INFO, res.data)
    })
  }
}

const mutations = {
  [types.SIGN_IN] (state, playload) {
    localStorage.access_token = playload.accessToken
    state.access_token = playload.accessToken
    router.push({
      path: decodeURIComponent(router.currentRoute.query.redirect || '/')
    })
  },
  [types.SIGN_OUT] (state) {
    state.access_token = null
    localStorage.removeItem('access_token')
  },
  [types.GET_ACCESS_TOKEN] (state) {
    if (!state.access_token) {
      state.access_token = localStorage.access_token
    }
  },
  [types.GET_ADMIN_INFO] (state, playload) {
    state.adminInfo = playload
  },
  [types.SITE_ITEM] (state, playload) {
    state.siteItem = playload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
