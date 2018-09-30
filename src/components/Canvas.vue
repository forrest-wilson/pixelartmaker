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
    canvasX (to, from) {
      // this.populateReactiveProperty(this.canvasX, this.canvasY)

      // Add a check to see what direction the canvas is going
      // If the new value minus the current value equals 1, we can assume the value is increasing
      if (to - from === 1) {
        console.log(to, from)
        let tempArr = []
        for (let i = 0; i < this.canvasY; i++) {
          let multi = 100
          let opts = {
            x: (multi * (this.canvasX - 1)),
            y: (multi * i),
            width: multi,
            height: multi,
            stroke: 'black',
            fill: 'white',
            strokeWidth: 1
          }

          tempArr.push(opts)
        }
        this.pushNewSquares(tempArr)
      } else {
        console.log('negative direction, not implemented yet')
      }
    },
    canvasY () {
      this.populateReactiveProperty(this.canvasX, this.canvasY)
    }
  },
  methods: {
    ...mapActions([
      'pushNewSquare',
      'pushNewSquares',
      'resetSquareProps',
      'setSquareAtIndex',
      'setSquareProps'
    ]),
    async populateReactiveProperty (x, y) {
      let newSquares = []
      for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
          let multi = 100
          let opts = {
            x: (multi * j),
            y: (multi * i),
            width: multi,
            height: multi,
            stroke: 'black',
            fill: 'white',
            strokeWidth: 1
          }

          newSquares.push(opts)
        }
      }

      this.setSquareProps(newSquares)
    },
    handleResize () {
      let { clientHeight, clientWidth } = this.$refs.canvas
      this.konvaConfig.width = clientWidth
      this.konvaConfig.height = clientHeight
    },
    handleClick (shape) {
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
