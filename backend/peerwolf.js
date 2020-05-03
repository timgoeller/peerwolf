const {ipcMain} = require('electron')
const hyperswarm = require('hyperswarm')
const hypercore = require('hypercore')
const core = require('hypercore')

module.exports = Peerwolf

function Peerwolf () {
  var feed

  handleEvents()
  
  function handleEvents() {
    ipcMain.on('create-game', (event, arg) => {
      createHypercore().then(feed => {
        console.log(feed.key.toString('hex'))
        joinSwarm(feed.discoveryKey)
      })
    })

    ipcMain.on('join-game', (event, arg) => {
      createReadHypercore(arg).then(feed => {
        joinSwarm(feed.discoveryKey)
      })
    })
  }
  
  function createHypercore() {
    if(!feed) {
      feed = hypercore('./game_data', {valueEncoding: 'json', overwrite: true})
    }
    
    return new Promise(function(resolve, reject) {
      feed.on('ready', function() {
        resolve(feed)
      })
    })
  }

  function createReadHypercore(key) {
    if(!feed) {
      feed = hypercore('./game-data', key, {valueEncoding: 'json', overwrite: true})
    }
    
    return new Promise(function(resolve, reject) {
      feed.on('ready', function() {
        resolve(feed)
      })
    })
  }

  function joinSwarm(topic) {
    const swarm = hyperswarm({maxPeers: 40})

    swarm.join(topic, {lookup: true,announce: true})

    swarm.on('connection', (socket, details) => {
      console.log('new connection!', details)
    })
  }
}

