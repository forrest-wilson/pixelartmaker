export default {
  computed: {
    brushColor: {
      get () {
        return this.$store.getters.getBrushColor
      },
      set (color) {
        this.$store.dispatch('setBrushColor', color)
      }
    }
  }
}
