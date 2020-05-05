const {ipcMain} = require('electron')
const hyperswarm = require('hyperswarm')
const crypto = require('crypto')

class Peerwolf {
  constructor () {
    this.clientID = crypto.randomBytes(32)
    this.handleEvents()
  }

  handleEvents() {
    let self = this
    ipcMain.on('create-game', (event, arg) => {
      let topic = crypto.randomBytes(32)
      console.log("TOPIC: " + topic.toString('hex'))
      self.joinSwarm(topic, event)
    })

    ipcMain.on('join-game', (event, arg) => {
      self.joinSwarm(Buffer.from(arg, 'hex'), event)
    })
  }

  joinSwarm(topic, renderEvent) {
    const swarm = hyperswarm({maxPeers: 40})

    swarm.join(topic, {lookup: true,announce: true})

    swarm.on('connection', (connection, details) => {
      connection.on('data', (data) => {
        var dropped = details.deduplicate(clientID, Buffer.from(data, 'hex'))
        console.log(dropped)
        if(!dropped) {
          renderEvent.sender.send('new-peer', {connection: connection, details: details})
        }
      });

      connection.setEncoding('utf8') //would send as Buffer otherwise
      connection.write(clientID.toString('hex')); //VERY simple handshake to handle deduplication
    })
  }
}

module.exports = Peerwolf