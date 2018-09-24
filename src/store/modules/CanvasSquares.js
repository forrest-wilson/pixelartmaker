const state = {
  jsonSquares: ''
}

const mutations = {
  SET_JSON_SQUARES (state, jsonData) {
    state.jsonSquares = jsonData
  }
}

const actions = {
  setJsonSquares ({ commit }, jsonData) {
    commit('SET_JSON_SQUARES', jsonData)
  }
}

const getters = {
  getSquares: state => state.squares,
  getJsonSquares: state => state.jsonSquares
}

export default {
  state,
  mutations,
  actions,
  getters
}