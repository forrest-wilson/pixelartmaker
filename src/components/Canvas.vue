<template>
  <div class="canvas" ref="canvas">
    <v-stage :config="konvaConfig" ref="stage">
      <v-layer ref="layer">
        <v-rect v-for="square in squareProps" :key="square.id" :config="square" @click="handleClick"></v-rect>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Canvas',
  data () {
    return {
      konvaConfig: {
        width: 0,
        height: 0,
        draggable: true
      }
    }
  },
  computed: {
    ...mapGetters({
      canvasX: 'getCanvasX',
      canvasY: 'getCanvasY',
      brushColor: 'getBrushColor',
      squareProps: 'getSquareProps'
    })
  },
  watch: {
    canvasX () {
      this.populateReactiveProperty(this.canvasX, this.canvasY)
    },
    canvasY () {
      this.populateReactiveProperty(this.canvasX, this.canvasY)
    }
  },
  methods: {
    ...mapActions([
      'pushNewSquare',
      'resetSquareProps',
      'setSquareAtIndex'
    ]),
    async populateReactiveProperty (x, y) {
      this.resetSquareProps()
      for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
          let multi = 25
          let opts = {
            x: (multi * j),
            y: (multi * i),
            width: multi,
            height: multi,
            stroke: 'black',
            fill: 'white',
            strokeWidth: 1
          }

          this.pushNewSquare(opts)
        }
      }
    },
    handleResize () {
      let { clientHeight, clientWidth } = this.$refs.canvas
      this.konvaConfig.width = clientWidth
      this.konvaConfig.height = clientHeight
    },
    handleClick (shape) {
      // Update vuex
      const stage = shape.getStage()
      stage.setFill(this.brushColor)
      stage.draw()
      
      this.setSquareAtIndex({ attrs: stage.getAttrs(), index: stage.index })
    },
    handleScroll ({ deltaY }) {
      if (deltaY) {
        const stage = this.$refs.layer.getStage()
        let opts = {}
        let factor = 0.1

        if (deltaY > 0) {
          // Increase scale
          opts.x = stage.scaleX() + factor
          opts.y = stage.scaleY() + factor
        } else {
          // Reduce scale if it isn't 1 already
          if (stage.attrs.scaleX > 1 || stage.attrs.scaleY > 1) {
            opts.x = stage.scaleX() - factor
            opts.y = stage.scaleY() - factor
          }
        }

        stage.scale(opts)
        stage.draw()
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.$refs.canvas.addEventListener('wheel', this.handleScroll)
    this.handleResize()
    this.populateReactiveProperty(this.canvasX, this.canvasY)
  }
}
</script>

<style lang="scss">
.canvas {
  flex-grow: 1;
  background-color: #e5e5e5;
}

.konvajs-content {
  background-color: #eee;
}
</style>
