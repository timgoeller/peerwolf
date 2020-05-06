<template>
  <div id='app'>
    <start-screen v-show="!startedGame"></start-screen>
    <main-screen v-show="startedGame"></main-screen>
    
  </div>
</template>

<script>
import StartScreen from "./components/StartScreen.vue"
import MainScreen from "./components/MainScreen.vue"

export default {
  data: function () {
    return {
      startedGame: false
    }
  },
  components: {
    StartScreen,
    MainScreen
  },
  mounted: function () {
    var vm = this
    this.$ipcRenderer.on('new-peer', (event, data) => {
      vm.startedGame = true
      console.log("New connection. Initiator? " + data.details.client)

      if(data.details.client) { //true if connection was initiated by this node
        // const pc = new RTCPeerConnection(configuration);
      }
      
    })
  },
  methods: {
    clicked: function() {
      console.log('Click')
      console.log(this.startedGame)
      this.startedGame = !this.startedGame
    }
  }
}
</script>

<style lang="scss" scoped>

</style>