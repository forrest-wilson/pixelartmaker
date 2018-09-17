export const canvasProps = {
  computed: {
    canvasProps: {
      get () {
        return this.$store.state.canvas
      },
      set (dims) {
        this.$store.dispatch('setCanvasDims', dims)
      }
    }
  }
}
