import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import account from './modules/account'
import app from './modules/app'

Vue.use(Vuex)

const state = {
  showLoading: false
}

const actions = {
  toggleLoading ({ commit }) {
    commit(types.TOGGLE_LOADING)
  }
}

const mutations = {
  [types.TOGGLE_LOADING] (state) {
    state.showLoading = !state.showLoading
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    account,
    app
  }
})
