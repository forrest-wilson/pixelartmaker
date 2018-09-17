<template>
  <div id="app">
    <div class="container">
      <section class="section">
        <div class="columns">
          <div class="column">
            <Canvas />
          </div>
          <div class="column sidebar-wrapper">
            <Sidebar />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Canvas from '@/components/Canvas.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Canvas,
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  max-width: 300px;
}
</style>
