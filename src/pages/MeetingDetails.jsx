import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { MeetingEndCallButton } from '../cmps/meeting-details/MeetingEndCallButton'
import { peerService } from '../services/peer.service'

function MeetingDetails() {
  const [peer, setPeer] = useState(null)
  const [localStream, setLocalStream] = useState(null)
  const [remoteStream, setRemoteStream] = useState(null)

  const localVideoRef = useRef()
  const remoteVideoRef = useRef()

  const navigate = useNavigate()

  const { id } = useParams()
  const { isHost } = JSON.parse(localStorage.getItem('user')) || false

  useEffect(() => {
    if (peer) {
      isHost ? handleHost() : handleGuest()
    } else {
      const newPeer = peerService.createPeer(isHost && id)
      setPeer(newPeer)
    }

    return () => {
      if (!peer) return
      onEndMeeting()
    }
  }, [peer])

  useEffect(() => {
    if (!peer) return

    if (!!localStream) {
      localVideoRef.current.srcObject = localStream
    }
    if (!!remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [localStream, remoteStream])

  function handleHost() {
    console.log('Handling HOST')

    setHostStream()
    peerService.startCall(peer, setRemoteStream)
  }

  function handleGuest() {
    console.log('Handling GUEST')

    peerService.joinCall(
      peer,
      id,
      setLocalStream,
      setRemoteStream,
      onEndMeeting
    )
  }

  async function setHostStream() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
    localVideoRef.current.srcObject = stream
  }

  function endLocalStream() {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject
      const tracks = stream.getTracks() // Get all tracks (audio, video)

      tracks.forEach(track => track.stop()) // Stop each track to release the camera
    }
  }

  function onEndMeeting() {
    endLocalStream()
    peer?.destroy()
    navigate('/')
  }

  if (!peer) return <div>Loading...</div>

  return (
    <section className="meeting-details p-4 bg-gray-800 flex flex-col items-center space-y-6">
      <h1 className="text-3xl font-bold text-white">Meeting ID: {id}</h1>
      <div
        className={`video-container w-full max-w-7xl rounded-lg overflow-hidden ${
          remoteStream
            ? 'grid grid-cols-1 sm:grid-cols-2'
            : 'flex justify-center'
        }`}
      >
        {(!!remoteStream || !isHost) && (
          <div className="aspect-w-16 aspect-h-9 bg-black">
            <video
              ref={remoteVideoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="aspect-w-16 aspect-h-9 bg-black">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Add more participants if needed */}
      <MeetingEndCallButton isHost={isHost} endCall={onEndMeeting}>
        {isHost ? 'End meeting' : 'Leave meeting'}
      </MeetingEndCallButton>
    </section>
  )
}

export default MeetingDetails
