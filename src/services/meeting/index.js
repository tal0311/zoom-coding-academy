const { DEV, VITE_LOCAL } = import.meta.env

import { makeId } from '../util.service'
import { meetingService as local } from './meeting.service.local'
import { meetingService as remote } from './meeting.service.remote'

function getEmptyMeeting() {
  return {
    id: makeId(),
    host_id: '',
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    meeting_link: '',
    participants: {},
    conversations: [],
    status: '',
    created_at: new Date().toISOString(),
  }
}

const service = DEV || VITE_LOCAL ? local : remote
export const meetingService = { ...service, getEmptyMeeting }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.meetingService = meetingService
