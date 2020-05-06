<template>
  <div>
    <h1>Start Screen</h1>
    <button v-on:click="joinGame">Join Game</button>
    <input v-model="gameID" type="text">
    <button v-on:click="createGame">Create Game</button>
  </div>
</template>

<script>
export default {
  name: 'StartScreen',
  data: function () {
    return {
      gameID: ""
    }
  },
  methods: {
    joinGame: function () {
      if(this.gameID !== undefined) {
        this.$ipcRenderer.send('join-game', this.gameID);
      };
    },
    createGame: function () {
      this.$ipcRenderer.send('create-game')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>