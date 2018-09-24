<template>
  <div class="sidebar">
    <div class="field">
      <label class="label">Pixels Wide (x)</label>
      <div class="control">
        <input class="input" type="number" placeholder="Enter a number" min="1" v-model="canvasX">
      </div>
    </div>

    <div class="field">
      <label class="label">Pixels High (y)</label>
      <div class="control">
        <input class="input" type="number" placeholder="Enter a number" min="1" v-model="canvasY">
      </div>
    </div>

    <label class="label">Brush Color</label>
    <div class="field has-addons">
      <div class="control">
        <a class="button is-static" :style="{ 'color': brushColor, 'background-color': brushColor }"></a>
      </div>
      <div class="control">
        <input class="input" type="text" placeholder="Enter a color" v-model="brushColor">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button class="button is-danger">Clear Grid</button>
      </div>
    </div>
  </div>
</template>

<script>
import brushColor from '@/components/mixins/brushColor.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Sidebar',
  mixins: [brushColor],
  computed: {
    ...mapGetters(['getCanvasX', 'getCanvasY']),
    canvasX: {
      get () {
        return this.getCanvasX
      },
      set (val) {
        this.setCanvasX(val)
      }
    },
    canvasY: {
      get () {
        return this.getCanvasY
      },
      set (val) {
        this.setCanvasY(val)
      }
    }
  },
  methods: {
    ...mapActions([
      'setCanvasX',
      'setCanvasY'
    ])
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: white;
  padding: 10px;
  flex-shrink: 0;
  border-right: 1px solid lightgrey;
}
</style>
