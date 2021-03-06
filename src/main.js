import Vue from 'vue'
import VueKonva from 'vue-konva'
import App from './App.vue'
import store from './store'
import '../node_modules/bulma/css/bulma.min.css'

Vue.config.productionTip = false

Vue.use(VueKonva)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
