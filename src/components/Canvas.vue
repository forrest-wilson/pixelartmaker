<template>
  <div class="columns">
    <div v-for="x in canvasProps.x" :key="x" class="column">
      <div v-for="y in canvasProps.y" :key="y">
        <Pixel :number="(canvasProps.x * y) - (canvasProps.x - x)" />
      </div>
    </div>
  </div>
</template>

<script>
import Pixel from '@/components/Pixel.vue'
import { canvasProps } from '@/components/mixins/canvasProps.js'

export default {
  name: 'Canvas',
  mixins: [canvasProps],
  components: {
    Pixel
  }
}
</script>

<style lang="scss" scoped>
$border: 1px solid black;

.columns {
  border-left: $border;
  border-top: $border;
}

.column {
  padding: 0;
}
</style>
