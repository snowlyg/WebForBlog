const state = {
  page: 1,
  pageSize: 10
}

const mutations = {
  SET_PAGE: (state, page) => {
    state.page = page
  },
  SET_PAGESIZE: (state, pageSize) => {
    state.pageSize = pageSize
  }
}

const actions = {
  setPage({ commit }, page) {
    commit('SET_PAGE', page)
  },
  setPageSize({ commit }, pageSize) {
    commit('SET_PAGESIZE', pageSize)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
