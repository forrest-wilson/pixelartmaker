const state = {
  squareProps: [],
  jsonSquares: ''
}

const mutations = {
  SET_JSON_SQUARES (state, jsonData) {
    state.jsonSquares = jsonData
  },
  PUSH_NEW_SQUARE (state, square) {
    state.squareProps.push(square)
  },
  RESET_SQUARE_PROPS (state) {
    state.squareProps.length = 0
  }
}

const actions = {
  setJsonSquares ({ commit }, jsonData) {
    commit('SET_JSON_SQUARES', jsonData)
  },
  pushNewSquare ({ commit }, square) {
    commit('PUSH_NEW_SQUARE', square)
  },
  resetSquareProps ({ commit }) {
    commit('RESET_SQUARE_PROPS')
  }
}

const getters = {
  getJsonSquares: state => state.jsonSquares,
  getJsonSquaresStringified: state => JSON.stringify(state.jsonSquares),
  getSquareProps: state => state.squareProps
}

export default {
  state,
  mutations,
  actions,
  getters
}
