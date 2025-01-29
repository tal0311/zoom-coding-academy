import { PeerServer } from 'peer'

const peerServer = PeerServer({ port: 9000, path: '/ca-zoom' })

peerServer.on('listening', () => {
  console.log('PeerJS server is running on port 9000')
})
