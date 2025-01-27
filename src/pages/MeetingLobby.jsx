import { Outlet, useNavigate } from 'react-router'
import { meetingService } from '../services/meeting'

function MeetingLobby() {
  const navigate = useNavigate()

  function onNewMeeting() {
    const newMeeting = meetingService.getEmptyMeeting()
    // temp workaround for setting a host
    localStorage.setItem('user', JSON.stringify({ isHost: true }))
    navigate(`/meeting/${newMeeting.id}`)
  }

  return (
    <div>
      <h1>meeting lobby</h1>
      <button onClick={onNewMeeting}>New meeting</button>
      <Outlet />
    </div>
  )
}

export default MeetingLobby
