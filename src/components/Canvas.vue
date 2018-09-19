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
    handleResize () {
      let { clientHeight, clientWidth } = this.$refs['canvas']
      this.configKonva.width = clientWidth
      this.configKonva.height = clientHeight
    },
    handleClick (shape) {
      const stage = shape.getStage()
      console.log(stage)

      stage.setFill('red')
      stage.draw()
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    for (let i = 0; i < 16; i++) {
      this.squares.push({
        x: (25 * i),
        y: 0,
        width: 25,
        height: 25,
        stroke: 'black',
        strokeWidth: 2,
        uid: uuid()
      })
    }
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
