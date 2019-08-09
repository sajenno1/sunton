import * as types from '../mutation-types'
import axois from '../../http'
import * as api from '../../api'

const state = {
  visitedViews: [],
  isCollapse: false,
  moduleMenus: {},
  menus: [],
  activeIndex: '',
  // backgroundColor: '#2d3a4b'
  backgroundColor: '#373d41'
}

const actions = {
  addVisitedViews ({ commit }, view) {
    commit(types.ADD_VISITED_VIEWS, view)
  },
  delVisitedViews ({ commit, state }, view) {
    return new Promise((resolve) => {
      commit(types.DEL_VISITED_VIEWS, view)
      resolve([...state.visitedViews])
    })
  },
  toggleSidebar ({ commit }) {
    commit(types.TOGGLE_SIDEBAR)
  },
  getModuleMenus ({ commit }) {
    return axois.post(api.moduleMenus).then(res => {
      commit(types.GET_MODULE_MENUS, res.data)
    })
  },
  getMenus ({ commit }, playload) {
    commit(types.GET_MENUS, playload)
  },
  setActiveIndex ({ commit }, playload) {
    commit(types.SET_ACTIVE_INDEX, playload)
  },
  activeMenu ({ commit }, playload) {
    commit(types.ACTIVE_MENU, playload)
  }
}

const mutations = {
  [types.ADD_VISITED_VIEWS] (state, playload) {
    if (state.visitedViews.some(v => v.path === playload.path)) {
      return
    }
    state.visitedViews.push({ name: playload.meta.displayName, path: playload.path })
  },
  [types.DEL_VISITED_VIEWS] (state, playload) {
    let index
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === playload.path) {
        index = i
        break
      }
    }
    state.visitedViews.splice(index, 1)
  },
  [types.TOGGLE_SIDEBAR] (state) {
    state.isCollapse = !state.isCollapse
  },
  [types.GET_MODULE_MENUS] (state, playload) {
    state.moduleMenus = playload
  },
  [types.GET_MENUS] (state, playload) {
    state.menus = state.moduleMenus.menus[playload.id]
  },
  [types.SET_ACTIVE_INDEX] (state, playload) {
    state.activeIndex = playload.id
  },
  [types.ACTIVE_MENU] (state, playload) {
    let path = playload.path
    for (let item in state.moduleMenus.menus) {
      let menusArr = state.moduleMenus.menus[item]
      for (let i = 0; i < menusArr.length; i++) {
        if (menusArr[i].webUrl === path) {
          state.activeIndex = item
          state.menus = state.moduleMenus.menus[item]
        }
        if (menusArr[i].children) {
          for (let j = 0; j < menusArr[i].children.length; j++) {
            var childrenArr = menusArr[i].children[j]
            if (childrenArr.webUrl === path) {
              state.activeIndex = item
              state.menus = state.moduleMenus.menus[item]
            }
          }
        }
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
