<template>
  <div class="toolbar">
    <button class="button nav-item" @click="exportJson">Export</button>
    <button class="button nav-item" @click="triggerFileLoad">Import</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Toolbar',
  methods: {
    ...mapActions([
      'setSquareProps'
    ]),
    exportJson () {
      let el = document.createElement('a')
      el.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.squareProps))}`)
      el.setAttribute('download', 'data.json')
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
        let json = JSON.parse(reader.result)
        this.setSquareProps(json)
        console.log(json)
      }

      reader.readAsText(target.files[0])
    }
  },
  computed: {
    ...mapGetters({
      squareProps: 'getSquareProps'
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
