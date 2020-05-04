const {ipcMain} = require('electron')
const hyperswarm = require('hyperswarm')
const crypto = require('crypto')

module.exports = Peerwolf

function Peerwolf () {
  var feed
  var clientID = crypto.randomBytes(32)

  handleEvents()
  
  function handleEvents() {
    ipcMain.on('create-game', (event, arg) => {
      let topic = crypto.randomBytes(32)
      console.log("TOPIC: " + topic.toString('hex'))
      joinSwarm(topic)
    })

    ipcMain.on('join-game', (event, arg) => {
      joinSwarm(Buffer.from(arg, 'hex'))
    })
  }

  function joinSwarm(topic) {
    const swarm = hyperswarm({maxPeers: 40})

    swarm.join(topic, {lookup: true,announce: true})

    swarm.on('connection', (connection, details) => {
      // socket.on('share-id', remoteID => {
      //   console.log(remoteID)
      //   console.log(clientID)
      //   if(remoteID != clientID) {
      //     var dropped = details.deduplicate(clientID, remoteID)
      //     console.log(dropped)
      //   }
      // })
      // socket.emit('share-id', clientID)

      console.log('My ID: ' + clientID.toString('hex'));

      connection.on('data', (data) => {
        //only data that can be recieved here is a client's id
        var dropped = details.deduplicate(clientID, Buffer.from(data, 'hex'))
        console.log(dropped)
      });

      connection.write(clientID.toString('hex')); //VERY simple handshake to handle deduplication
    })
  }
}

