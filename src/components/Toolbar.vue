<template>
  <div class="toolbar">
    <button class="button nav-item" @click="exportJson">Export</button>
    <button class="button nav-item" @click="triggerFileLoad">Import</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Toolbar',
  methods: {
    exportJson () {
      let dataUri = `data:text/json;charset=utf-8,${encodeURIComponent(this.jsonSquares)}`
      let exportFileDefaultName = 'data.json'

      let el = document.createElement('a')
      el.setAttribute('href', dataUri)
      el.setAttribute('download', exportFileDefaultName)
      el.click()
    },
    triggerFileLoad () {
      let el = document.createElement('input')
      el.setAttribute('type', 'file')
      el.onchange = this.importJson
      el.click()
    },
    importJson ({ target }) {
      console.log('importing JSON')
      let reader = new FileReader()
      reader.onload = () => {
        let obj = JSON.parse(JSON.parse(reader.result))
        console.log(obj)
      }

      reader.readAsText(target.files[0])
    }
  },
  computed: {
    ...mapGetters({
      jsonSquares: 'getJsonSquaresStringified'
    })
  }
}
</script>

<style lang="scss">
.toolbar {
  height: 45px;
  background-color: rgb(37, 37, 37);
}
</style>
