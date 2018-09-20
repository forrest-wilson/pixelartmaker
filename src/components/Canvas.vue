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
import squares from '@/components/mixins/squares.js'
import uuid from 'uuid'
import { mapGetters } from 'vuex'

export default {
  name: 'Canvas',
  mixins: [canvasProps, squares],
  data () {
    return {
      configKonva: {
        width: 0,
        height: 0,
        draggable: true
      }
    }
  },
  computed: {
    ...mapGetters({
      canvasDims: 'getCanvasDims'
    })
  },
  watch: {
    canvasX () {
      this.init()
    },
    canvasY () {
      this.init()
    }
  },
  methods: {
    init (x, y) {
      this.squares.length = 0
      for (let i = 0; i < /* this.canvasDims.y */ y; i++) {
        for (let j = 0; j < /* this.canvasDims.x */ x; j++) {
          let multi = 25
          let opts = {
            x: (multi * j),
            y: (multi * i),
            width: multi,
            height: multi,
            stroke: 'black',
            fill: 'white',
            strokeWidth: 2,
            uid: uuid()
          }

          this.squares.push(opts)
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
      console.log(stage)
    },
    handleScroll ({ deltaY }) {
      if (deltaY) {
        const stage = this.$refs['layer'].getStage()
        let opts = {}

        if (deltaY > 0) {
          // Increase scale by 1
          opts.x = stage.scaleX() + 1
          opts.y = stage.scaleY() + 1
        } else {
          // Reduce scale by 1 if it isn't 1 already
          if (stage.attrs.scaleX > 1 || stage.attrs.scaleY > 1) {
            opts.x = stage.scaleX() - 1
            opts.y = stage.scaleY() - 1
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
    this.init(this.canvasDims.x, this.canvasDims.y)
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
