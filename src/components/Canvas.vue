<template>
  <div class="canvas" ref="canvas">
    <v-stage :config="konvaConfig" ref="stage">
      <v-layer v-for="(row, i) in squareProps" :key="i" ref="layer">
        <v-rect v-for="square in row" :key="square.id" :config="square" @click="handleClick"></v-rect>
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
      },
      multi: 50
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
      if (!isNaN(to)) {
        // Add a check to see what direction the canvas is going
        // If the new value minus the current value equals 1, we can assume the value is increasing
        if (to - from === 1) {
          for (let i = 0; i < this.canvasY; i++) {
            let opts = {
              x: (this.multi * (this.canvasX - 1)),
              y: (this.multi * i),
              width: this.multi,
              height: this.multi,
              stroke: 'black',
              fill: 'white',
              strokeWidth: 1
            }
            this.pushNewSquare({ square: opts, index: i })
          }
        } else {
          for (let i = 0; i < this.canvasY; i++) {
            this.popSquare(i)
          }
        }
      } else {
        console.log('NaN')
      }
    },
    canvasY (to, from) {
      if (!isNaN(to)) {
        if (to - from === 1) {
          let row = []
          for (let i = 0; i < this.canvasX; i++) {
            let opts = {
              x: (this.multi * i),
              y: ((this.multi * this.canvasY) - this.multi),
              width: this.multi,
              height: this.multi,
              stroke: 'black',
              fill: 'white',
              strokeWidth: 1
            }
            row.push(opts)
          }
          this.pushNewRow(row)
        } else {
          this.popRow()
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'pushNewSquare',
      'popSquare',
      'pushNewRow',
      'popRow',
      'setSquareProps',
      'setSquareAtIndex'
    ]),
    async populateReactiveProperty (x, y) {
      let nestedArrays = []
      for (let i = 0; i < y; i++) {
        let row = []
        for (let j = 0; j < x; j++) {
          let opts = {
            x: (this.multi * j),
            y: (this.multi * i),
            width: this.multi,
            height: this.multi,
            stroke: 'black',
            fill: 'white',
            strokeWidth: 1
          }
          row.push(opts)
        }
        nestedArrays.push(row)
      }

      this.setSquareProps(nestedArrays)
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
      console.log(stage)

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
