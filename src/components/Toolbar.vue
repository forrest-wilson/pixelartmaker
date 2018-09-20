<template>
  <div class="toolbar">
    <button class="button nav-item" @click="exportToJson">Export to JSON</button>
  </div>
</template>

<script>
import squares from '@/components/mixins/squares.js'

export default {
  name: 'Toolbar',
  mixins: [squares],
  methods: {
    exportToJson () {
      console.log(this.offlineSquares)
    }
  }
}
</script>

<style lang="scss">
.toolbar {
  height: 45px;
  background-color: rgb(37, 37, 37);
}
</style>
