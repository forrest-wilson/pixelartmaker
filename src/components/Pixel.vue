<template>
  <div @click="changeColor" class="pixel" :style="{ 'background-color': color, 'height': `${width}px` }"></div>
</template>

<script>
import brushColor from '@/components/mixins/brushColor.js'

export default {
  name: 'Pixel',
  props: ['number'],
  mixins: [brushColor],
  data () {
    return {
      color: '#fff',
      width: 0
    }
  },
  methods: {
    changeColor () {
      this.color = this.brushColor
    },
    updateDims () {
      this.width = this.$el.clientWidth
    }
  },
  mounted () {
    this.updateDims()
  },
  updated () {
    this.updateDims()
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
