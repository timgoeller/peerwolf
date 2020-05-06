const {ipcMain} = require('electron')
const hyperswarm = require('hyperswarm')
const crypto = require('crypto')
const {Peer, PeerConnection} = require('./peer')

class Peerwolf {
  constructor () {
    this.clientID = crypto.randomBytes(32)
    this.handleEvents()
    this.peers = new Map()
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

  //joins the swarm and handles creations of peers/dedup on incoming connections
  joinSwarm(topic, renderEvent) {
    var self = this

    const swarm = hyperswarm({maxPeers: 40})

    swarm.join(topic, {lookup: true,announce: true})

    swarm.on('connection', (connection, details) => {
      connection.on('data', (data) => {
        let remoteHex = Buffer.from(data, 'hex')
        var dropped = details.deduplicate(self.clientID, remoteHex)
        if (!dropped) {
          let remotePeer = self.peers.get(remoteHex)
          if (!remotePeer) {
            remotePeer = new Peer()
            self.peers.set(remoteHex, remotePeer)
          }
          remotePeer.addConnection(new PeerConnection(connection, details))
        }
      });

      connection.setEncoding('utf8') //would send as Buffer otherwise
      connection.write(self.clientID.toString('hex')); //VERY simple handshake to handle deduplication
    })
  }
}

module.exports = Peerwolf