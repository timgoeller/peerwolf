import Vue from 'vue'
import App from './App.vue'

import './assets/main.scss'; //global css

new Vue({
  el: '#app',
  render: h => h(App)
})