const state = {
  brushColor: '#fff'
}

const mutations = {
  SET_BRUSH_COLOR (state, color) {
    state.brushColor = color
  }
}

const actions = {
  setBrushColor ({ commit }, color) {
    commit('SET_BRUSH_COLOR', color)
  }
}

const getters = {
  getBrushColor: state => state.brushColor
}

export default {
  state,
  mutations,
  actions,
  getters
}
