<template>
  <div @click="changeColor" class="pixel" :style="{ 'background-color': color, 'height': `${width}px` }"></div>
</template>

<script>
export default {
  name: 'Pixel',
  props: ['number'],
  data () {
    return {
      color: '#fff',
      width: 0
    }
  },
  methods: {
    changeColor () {
      this.color = 'blue'
    }
  },
  mounted () {
    this.width = this.$el.clientWidth
  }
}
</script>

<style lang="scss">
$border: 1px solid black;

.pixel {
  border-right: $border;
  border-bottom: $border;
}
</style>
