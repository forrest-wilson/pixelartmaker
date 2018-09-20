<template>
  <div class="toolbar">
    <button class="button nav-item" @click="exportToJson">Export to JSON</button>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  methods: {
    exportToJson () {
      console.log('clicked')
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
