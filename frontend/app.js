import Vue from 'vue'
import App from './App.vue'
import {ipcRenderer} from 'electron'

import './assets/main.scss'; //global css

Vue.prototype.$ipcRenderer = ipcRenderer

new Vue({
  el: '#app',
  render: h => h(App)
})