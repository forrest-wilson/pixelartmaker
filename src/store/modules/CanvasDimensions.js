const state = {
  canvas: {
    x: 4,
    y: 4
  }
}

const mutations = {
  SET_CANVAS_X ({ canvas }, val) {
    canvas.x = parseInt(val)
  },
  SET_CANVAS_Y ({ canvas }, val) {
    canvas.y = parseInt(val)
  }
}

const actions = {
  setCanvasX ({ commit }, val) {
    commit('SET_CANVAS_X', val)
  },
  setCanvasY ({ commit }, val) {
    commit('SET_CANVAS_Y', val)
  }
}

const getters = {
  getCanvasX: ({ canvas }) => canvas.x,
  getCanvasY: ({ canvas }) => canvas.y
}

export default {
  state,
  mutations,
  actions,
  getters
}
