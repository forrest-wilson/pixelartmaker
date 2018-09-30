const state = {
  // Model squareProps as a multidimensional array
  // eg [[row 1 squares], [row 2 squares], [row 3 squares]]
  squareProps: []
}

const mutations = {
  PUSH_NEW_SQUARE (state, { square, index }) {
    state.squareProps[index].push(square)
  },
  POP_SQUARE (state, index) {
    state.squareProps[index].pop()
  },
  PUSH_NEW_ROW (state, row) {
    state.squareProps.push(row)
  },
  POP_ROW (state) {
    state.squareProps.pop()
  },
  SET_SQUARE_PROPS (state, squares) {
    state.squareProps = squares
  },
  SET_SQUARE_AT_INDEX (state, { attrs, index }) {
    state.squareProps.splice(index, 1, attrs)
  }
}

const actions = {
  pushNewSquare ({ commit }, payload) {
    commit('PUSH_NEW_SQUARE', payload)
  },
  popSquare ({ commit }, payload) {
    commit('POP_SQUARE', payload)
  },
  pushNewRow ({ commit }, row) {
    commit('PUSH_NEW_ROW', row)
  },
  popRow ({ commit }) {
    commit('POP_ROW')
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
