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
  }
}
</script>

<style lang="scss" scoped>

</style>