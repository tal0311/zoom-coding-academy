import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { peerService } from '../services/peer.service'

function MeetingDetails() {
  const [peer, setPeer] = useState(null)

  const { isHost } = JSON.parse(localStorage.getItem('user')) || false

  const localVideoRef = useRef()
  const remoteVideoRef = useRef()

  const { id } = useParams()

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
      console.log('Hi')
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
      stream => {
        localVideoRef.current.srcObject = stream
      },
      stream => {
        remoteVideoRef.current.srcObject = stream
      }
    )
  }

  function handleGuest() {
    peerService.joinCall(
      peer,
      id,
      stream => {
        localVideoRef.current.srcObject = stream
      },
      stream => {
        remoteVideoRef.current.srcObject = stream
      }
    )
  }

  async function setLocalStream() {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
    localVideoRef.current.srcObject = localStream
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
    </section>
  )
}

export default MeetingDetails
