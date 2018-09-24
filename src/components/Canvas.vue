<template>
  <div class="canvas" ref="canvas">
    <v-stage :config="konvaConfig" ref="stage">
      <v-layer ref="layer">
        <v-rect v-for="square in squareProps" :key="square.uid" :config="square" @click="handleClick"></v-rect>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import uuid from 'uuid'
import { mapGetters } from 'vuex'

export default {
  name: 'Canvas',
  data () {
    return {
      konvaConfig: {
        width: 0,
        height: 0,
        draggable: true
      },
      squareProps: []
    }
  },
  computed: {
    ...mapGetters({
      canvasX: 'getCanvasX',
      canvasY: 'getCanvasY',
      brushColor: 'getBrushColor',
      jsonSquares: 'getJsonSquares'
    })
  },
  watch: {
    canvasX () {
      this.init(this.canvasX, this.canvasY)
    },
    canvasY () {
      this.init(this.canvasX, this.canvasY)
    },
    getJsonSquares () {
      Konva.Node.create(this.jsonSquares, this.$refs.stage)
      // this.init()
    }
  },
  methods: {
    init (x, y) {
      this.squareProps.length = 0
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
            strokeWidth: 1,
            uid: uuid()
          }

          this.squareProps.push(opts)
        }
      }
    },
    handleResize () {
      let { clientHeight, clientWidth } = this.$refs['canvas']
      this.konvaConfig.width = clientWidth
      this.konvaConfig.height = clientHeight
    },
    handleClick (shape) {
      const stage = shape.getStage()
      stage.setFill(this.brushColor)
      stage.draw()
      let stageJson = this.$refs.stage.getStage().toJSON()
      this.$store.dispatch('setJsonSquares', stageJson)
    },
    handleScroll ({ deltaY }) {
      if (deltaY) {
        const stage = this.$refs['layer'].getStage()
        let opts = {}
        let factor = 0.1

        if (deltaY > 0) {
          // Increase scale by 1
          opts.x = stage.scaleX() + factor
          opts.y = stage.scaleY() + factor
        } else {
          // Reduce scale by 1 if it isn't 1 already
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
    this.$refs['canvas'].addEventListener('wheel', this.handleScroll)
    this.handleResize()
    this.init(this.canvasX, this.canvasY)
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
