const state = {
  squareProps: []
}

const mutations = {
  PUSH_NEW_SQUARE (state, square) {
    state.squareProps.push(square)
  },
  RESET_SQUARE_PROPS (state) {
    state.squareProps.length = 0
  },
  SET_SQUARE_PROPS (state, squares) {
    state.squareProps.length = 0
    state.squareProps = squares
  },
  SET_SQUARE_AT_INDEX (state, { attrs, index }) {
    state.squareProps.splice(index, 1, attrs)
  }
}

const actions = {
  pushNewSquare ({ commit }, square) {
    commit('PUSH_NEW_SQUARE', square)
  },
  resetSquareProps ({ commit }) {
    commit('RESET_SQUARE_PROPS')
  },
  setSquareProps ({ commit }, squares) {
    commit('SET_SQUARE_PROPS', squares)
  },
  setSquareAtIndex ({ commit }, payload) {
    commit('SET_SQUARE_AT_INDEX', payload)
  }
}

const getters = {
  getSquareProps: state => state.squareProps
}

export default {
  state,
  mutations,
  actions,
  getters
}
