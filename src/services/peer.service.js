import Peer from 'peerjs'

export const peerService = {
  createPeer,
  getUserMedia,
  joinCall,
  startCall,
  endCall,
}

function createPeer(hostMeetingId) {
  var peer = new Peer(hostMeetingId)

  peer.on('open', id => {
    console.log('My peer ID is: ' + id)
  })

  peer.on('error', err => {
    console.error('Peer error:', err)
  })

  return peer
}

// Get user media (video and audio)
async function getUserMedia(constraints = { video: true, audio: true }) {
  try {
    return await navigator.mediaDevices.getUserMedia(constraints)
  } catch (error) {
    console.error('Error accessing media devices:', error)
    throw error
  }
}

async function joinCall(
  peer,
  remoteId,
  onLocalStream,
  onRemoteStream,
  onEndMeeting
) {
  try {
    const stream = await getUserMedia()
    onLocalStream && onLocalStream(stream)

    const call = peer.call(remoteId, stream)

    call.on('stream', remoteStream => {
      console.log('Received remote stream')
      onRemoteStream && onRemoteStream(remoteStream)
    })

    call.on('close', () => {
      console.log('Call closed')
      onEndMeeting && onEndMeeting()
    })

    call.on('error', error => {
      console.error('Call error:', error)
    })

    return call
  } catch (error) {
    console.error('Failed to make a call:', error)
    throw error
  }
}

async function startCall(peer, onLocalStream, onRemoteStream) {
  peer.on('call', async call => {
    try {
      const stream = await getUserMedia()
      onLocalStream && onLocalStream(stream)

      call.answer(stream)

      call.on('stream', remoteStream => {
        console.log('Received remote stream')
        onRemoteStream && onRemoteStream(remoteStream)
      })

      call.on('close', () => {
        console.log('Call closed')
      })

      call.on('error', error => {
        console.error('Call error:', error)
      })

      return call
    } catch (error) {
      console.error('Failed to answer call:', error)
    }
  })
}

// End the current call
function endCall(call) {
  if (call) {
    call.close()
    console.log('Call ended')
  } else {
    console.error('No active call to end')
  }
}
