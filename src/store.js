import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    canvas: {
      x: 16,
      y: 16
    }
  },
  mutations: {
    SET_CANVAS_DIMS ({ canvas }, { x, y }) {
      if (x) canvas.x = x
      if (y) canvas.y = y
    }
  },
  actions: {
    setCanvasDims ({ commit }, payload) {
      commit('SET_CANVAS_DIMS', payload)
    }
  }
})
