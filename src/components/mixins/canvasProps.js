export default {
  computed: {
    canvasX: {
      get () {
        return this.$store.state.canvas.x
      },
      set (val) {
        this.$store.dispatch('setCanvasX', val)
      }
    },
    canvasY: {
      get () {
        return this.$store.state.canvas.y
      },
      set (val) {
        this.$store.dispatch('setCanvasY', val)
      }
    }
  }
}
