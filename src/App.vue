<template>
  <div id="app">
    <Toolbar />
    <main class="main">
      <Sidebar />
      <Canvas />
    </main>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue'
import Canvas from '@/components/Canvas.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Toolbar,
    Canvas,
    Sidebar
  }
}
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
}
.main {
  display: flex;
  height: calc(100% - 45px);
}
</style>
