import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { peerService } from '../services/peer.service'

function MeetingDetails() {
  const [peer, setPeer] = useState(null)
  const [localConnection, setLocalConnection] = useState(null)

  const localVideoRef = useRef()
  const remoteVideoRef = useRef()

  const navigate = useNavigate()

  const { id } = useParams()
  const { isHost } = JSON.parse(localStorage.getItem('user')) || false

  useEffect(() => {
    if (peer) {
      if (isHost) handleHost()
      else handleGuest()
      return
    }

    const newPeer = peerService.createPeer(isHost && id)
    setPeer(newPeer)
  }, [peer])

  useEffect(() => {
    return () => {
      onEndMeeting()
    }
  }, [])

  function handleHost() {
    //**
    // wip - It is currently not possible to
    // display a video from the host before
    // a connection is established.
    // The behavior of streaming media and working
    // with the peerService is not yet fully understood.
    //  */

    // setLocalStream()
    peerService.startCall(
      peer,
      setLocalStream,
      stream => {
        remoteVideoRef.current.srcObject = stream
      }
    )
  }

  function handleGuest() {
    peerService.joinCall(
      peer,
      id,
      setLocalStream,
      stream => {
        remoteVideoRef.current.srcObject = stream
      },
      onEndMeeting
    )
  }

  async function setLocalStream(localStream) {
    localVideoRef.current.srcObject = localStream
    setLocalConnection(localStream)
  }

  function endLocalStream() {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject
      const tracks = stream.getTracks() // Get all tracks (audio, video)

      tracks.forEach(track => track.stop()) // Stop each track to release the camera
    }
  }

  async function onEndMeeting() {
    endLocalStream()
    // peer?.disconnect()
    peer?.destroy()
    // localConnection?.close()
    // Need more testing
    // localVideoRef.current.srcObject = null
    navigate('/')
  }

  if (!peer) return <div>Loading...</div>

  return (
    <section className="meeting-details p-4 bg-gray-800 flex flex-col items-center space-y-6">
      <h1 className="text-3xl font-bold text-white">Meeting ID: {id}</h1>
      <div className="video-container grid grid-cols-1 sm:grid-cols-2 w-full max-w-7xl rounded-lg overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 bg-black">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-w-16 aspect-h-9 bg-black">
          <video
            ref={remoteVideoRef}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Add more participants if needed */}
      <button
        onClick={onEndMeeting}
        className={`px-4 py-2 rounded-lg text-white font-medium 
                  ${
                    isHost
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }
                  focus:outline-none focus:ring-2 focus:ring-offset-2 
                  ${isHost ? 'focus:ring-red-500' : 'focus:ring-blue-500'}
                  transition duration-300`}
      >
        {isHost ? 'End meeting' : 'Leave meeting'}
      </button>
    </section>
  )
}

export default MeetingDetails
