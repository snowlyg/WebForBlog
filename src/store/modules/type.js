
const state = {
  types: []
}

const mutations = {
  SET_TYPES: (state, types) => {
    state.types = types
  }
}

const actions = {
  setTypes({ commit }, types) {
    commit('SET_TYPES', types)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
