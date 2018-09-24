const state = {
  canvas: {
    squares: [],
    jsonSquares: ''
  }
}

const mutations = {
  SET_SQUARES (state, squares) {
    state.squares = squares
    console.log('state squares')
    console.log(state.squares)
  },
  SET_SQUARE (state, { square, index }) {
    state.squares[index] = square
  },
  SET_JSON_SQUARES (state, jsonData) {
    state.jsonSquares = jsonData
  }
}

const actions = {
  setSquares ({ commit }, val) {
    commit('SET_SQUARES', val)
  },
  setSquare ({ commit }, stage) {
    commit('SET_SQUARE', stage)
  },
  setJsonSquares ({ commit }, jsonData) {
    commit('SET_JSON_SQUARES', jsonData)
  }
}

const getters = {
  getSquares: state => state.squares,
  getJsonSquares: state => state.jsonSquares,
  getJsonSquaresStringified: state => JSON.stringify(state.jsonSquares)
}

export default {
  state,
  mutations,
  actions,
  getters
}
