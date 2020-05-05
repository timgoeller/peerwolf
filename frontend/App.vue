<template>
  <div id='app'>
    <start-screen v-if="!startedGame"></start-screen>
    <main-screen v-if="startedGame"></main-screen>
  </div>
</template>

<script>
import StartScreen from "./components/StartScreen.vue"

export default {
  data: {
    startedGame: false
  },
  components: {
    StartScreen
  },
  mounted: function () {
    this.$ipcRenderer.on('new-peer', (event, data) => {
      console.log("New connection. Initiator? " + data.details.client)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>