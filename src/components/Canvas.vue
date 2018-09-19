<template>
  <div class="canvas" ref="canvas">
    <v-stage :config="configKonva" ref="stage">
      <v-layer ref="layer">
        <v-rect v-for="square in squares" :key="square.uid" :config="square" @click="handleClick"></v-rect>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import canvasProps from '@/components/mixins/canvasProps.js'
import uuid from 'uuid'

export default {
  name: 'Canvas',
  mixins: [canvasProps],
  data () {
    return {
      configKonva: {
        width: 0,
        height: 0,
        draggable: true
      },
      squares: []
    }
  },
  methods: {
    init () {
      for (let i = 0; i < this.$store.state.canvas.x; i++) {
        for (let j = 0; j < this.$store.state.canvas.y; j++) {
          this.squares.push({
            x: (50 * i),
            y: (50 * j),
            width: 50,
            height: 50,
            stroke: 'black',
            fill: 'white',
            strokeWidth: 2,
            uid: uuid()
          })
        }
      }
    },
    handleResize () {
      let { clientHeight, clientWidth } = this.$refs['canvas']
      this.configKonva.width = clientWidth
      this.configKonva.height = clientHeight
    },
    handleClick (shape) {
      const stage = shape.getStage()
      stage.setFill(this.$store.state.brushColor)
      stage.draw()
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.init()
  }
}
</script>

<style lang="scss">
.canvas {
  flex-grow: 1;
  background-color: #555;
}

.konvajs-content {
  background-color: #eee;
}
</style>
