export default {
  computed: {
    squares: {
      get () {
        return this.$store.state.squares
      },
      set (payload) {
        this.$store.dispatch('setSquares', payload)
      }
    }
  }
}
