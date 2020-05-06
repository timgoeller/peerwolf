class Peer {
  constructor () {
    this.connections = []
  }
  
  addConnection (peerConnection) {
    console.log('added connection')
    this.connections.push(peerConnection)
  }
}

class PeerConnection {
  constructor (connection, details) {
    this.connection = connection
    this.details = details
  }
}
module.exports = {Peer, PeerConnection}