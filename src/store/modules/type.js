
const state = {
  types: [],
  type_id: 0
}

const mutations = {
  SET_TYPES: (state, value) => {
    state.types = value
  },
  SET_TYPE_ID: (state, value) => {
    state.type_id = value
  }
}

const actions = {
  setTypes({ commit }, value) {
    commit('SET_TYPES', value)
  },
  setTypeId({ commit }, value) {
    commit('SET_TYPE_ID', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
