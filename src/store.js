import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    canvas: {
      x: 16,
      y: 16
    },
    brushColor: '#fff',
    squares: []
  },
  mutations: {
    SET_CANVAS_X ({ canvas }, val) {
      canvas.x = parseInt(val)
    },
    SET_CANVAS_Y ({ canvas }, val) {
      canvas.y = parseInt(val)
    },
    SET_BRUSH_COLOR (state, color) {
      state.brushColor = color
    },
    SET_SQUARES (state, squares) {
      state.squares = squares
      console.log('state squares')
      console.log(state.squares)
    },
    SET_SQUARE (state, { square, index }) {
      state.squares[index] = square
    }
  },
  actions: {
    setCanvasX ({ commit }, val) {
      commit('SET_CANVAS_X', val)
    },
    setCanvasY ({ commit }, val) {
      commit('SET_CANVAS_Y', val)
    },
    setBrushColor ({ commit }, color) {
      commit('SET_BRUSH_COLOR', color)
    },
    setSquares ({ commit }, val) {
      commit('SET_SQUARES', val)
    },
    setSquare ({ commit }, stage) {
      commit('SET_SQUARE', stage)
    }
  },
  getters: {
    getCanvasDims: state => state.canvas
  }
})
