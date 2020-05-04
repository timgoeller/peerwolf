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
      joinSwarm(topic, event)
    })

    ipcMain.on('join-game', (event, arg) => {
      joinSwarm(Buffer.from(arg, 'hex'), event)
    })
  }

  function joinSwarm(topic, renderEvent) {
    const swarm = hyperswarm({maxPeers: 40})

    swarm.join(topic, {lookup: true,announce: true})

    swarm.on('connection', (connection, details) => {

      connection.on('data', (data) => {
        //only data that can be recieved here is a client's id
        var dropped = details.deduplicate(clientID, Buffer.from(data, 'hex'))
        console.log(dropped)
        if(!dropped) {
          renderEvent.sender.send('new-peer', {connection: connection, details: details})
        }
      });

      connection.setEncoding('utf8')
      connection.write(clientID.toString('hex')); //VERY simple handshake to handle deduplication
    })
  }
}

