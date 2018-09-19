<template>
  <div class="sidebar">
    <div class="field">
      <label class="label">Pixels Wide (x)</label>
      <div class="control">
        <input class="input" type="number" placeholder="Enter a number" min="1" max="64" v-model="canvasX">
      </div>
    </div>

    <div class="field">
      <label class="label">Pixels High (y)</label>
      <div class="control">
        <input class="input" type="number" placeholder="Enter a number" min="1" max="64" v-model="canvasY">
      </div>
    </div>

    <div class="field">
      <label class="label">Brush Color</label>
      <div class="control">
        <input class="input" type="text" placeholder="Enter a number" v-model="brushColor">
      </div>
    </div>

    <label class="checkbox">
      <input type="checkbox" checked>
      Grid
    </label>
  </div>
</template>

<script>
import canvasProps from '@/components/mixins/canvasProps.js'
import brushColor from '@/components/mixins/brushColor.js'

export default {
  name: 'Sidebar',
  mixins: [canvasProps, brushColor]
}
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: blue;
  padding: 10px;
  flex-shrink: 0;
}
</style>
