<template>
  <div id="start-screen">
    <h1>Welcome to Peerwolf!</h1>
    <cv-button>Create Game</cv-button>
    <cv-text-input placeholder="Game ID"></cv-text-input>
    <cv-button>Join Game</cv-button>
  </div>
</template>

<script>
  export default {
    name: 'StartScreen',
    data() {
      return {

      };
    },
    methods: {
    },
  };
</script>

<style scoped>
  #start-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    margin: 5% auto; 
  }

  #start-screen .cv-button {
    margin: 10px;
  }

  .cv-text-input {
    margin: 30px 0;
  }


</style>