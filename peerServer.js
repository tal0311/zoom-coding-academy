import fs from 'fs'
import { PeerServer } from 'peer'

const options = {
  key: fs.readFileSync('./.cert/key.pem'),
  cert: fs.readFileSync('./.cert/cert.pem'),
}

const peerServer = PeerServer({
  port: 9000,
  path: '/ca-zoom',
  proxied: true,
  ssl: options,
})

peerServer.on('listening', () => {
  console.log('PeerJS server is running on port 9000')
})
