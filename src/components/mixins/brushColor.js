export default {
  computed: {
    brushColor: {
      get () {
        return this.$store.state.brushColor
      },
      set (color) {
        this.$store.dispatch('setBrushColor', color)
      }
    }
  }
}
