<template>
  <div class="canvas" ref="canvas">
    <v-stage :config="konvaConfig" ref="stage">
      <v-layer ref="layer">
        <div v-for="(row, i) in squareProps" :key="i">
          <v-rect v-for="square in row" :key="square.id" :config="square" @click="handleClick"></v-rect>
        </div>
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
      // If 'to' is a number, continue
      if (!isNaN(to)) {
        // If canvasX and the length of a row are the same, it means the user
        // has imported a file and canvas re-rendering isn't needed
        if (this.canvasX !== this.squareProps[0].length) {
          // Add a check to see what direction the canvas is going
          if (to > from) {
            for (let i = from; i < to; i++) {
              let column = []
              for (let j = 0; j < this.canvasY; j++) {
                let opts = {
                  x: (this.multi * i),
                  y: (this.multi * j),
                  width: this.multi,
                  height: this.multi,
                  stroke: 'black',
                  fill: 'white',
                  strokeWidth: 1
                }
                column.push(opts)
              }
              this.pushNewColumn(column)
            }
          }

          if (to < from) {
            for (let i = from - 1; i >= to; i--) {
              this.popColumn(i)
            }
          }
        }
      } else {
        console.log('NaN')
      }
    },
    canvasY (to, from) {
      // If 'to' is a number, continue
      if (!isNaN(to)) {
        // If canvasY and the length of a column are the same, it means the user
        // has imported a file and canvas re-rendering isn't needed
        if (this.canvasY !== this.squareProps.length) {
          // Add a check to see what direction the canvas is going
          if (to > from) {
            for (let i = from; i < to; i++) {
              let row = []
              for (let j = 0; j < this.canvasX; j++) {
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
              this.pushNewRow(row)
            }
          }

          if (to < from) {
            for (let i = from - 1; i >= to; i--) {
              this.popRow(i)
            }
          }
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
      'pushNewColumn',
      'popColumn',
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

      this.setSquareAtIndex({ attrs: stage.getAttrs(), layerIndex: stage.parent.index, squareIndex: stage.index })
    },
    handleScroll ({ deltaY }) {
      if (deltaY) {
        const stage = this.$refs.stage.getStage()
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
