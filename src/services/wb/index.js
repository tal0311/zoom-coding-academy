const { DEV, VITE_LOCAL } = import.meta.env

import { makeId } from '../util.service'
// import { makeId } from '../util.service'

import { wbService as local } from './wb.service.local'
// import { wbService as remote } from './wb.service.remote'

function getEmptyWb() {
  return {
    // id: makeId(),
    owner: 'Moishee',
    elements: [],
  }
}

function getEmptyElement(toolName) {
  if (toolName === 'select' || toolName === 'grab') return null
  let emptyEl
  switch (toolName) {
    case 'pen':
      emptyEl = {
        points: [],
      }
      break
    case 'rectangle':
      emptyEl = {
        pos: { x: 0, y: 0 },
      }
      break
    case 'circle':
      emptyEl = {
        centerPos: { x: 0, y: 0 },
      }
      break
    // case 'img':
    //     break
    case 'line':
      emptyEl = {
        startPos: { x: 0, y: 0 },
        endPos: { x: 0, y: 0 },
      }

      break
    // default:
    //   emptyEl = null
  }
  emptyEl.id = makeId()
  emptyEl.type = toolName
  emptyEl.color = '#000'
  return emptyEl
}

function getDefaultFilter() {
  return {
    txt: '',
    minSpeed: '',
    sortField: '',
    sortDir: '',
  }
}



const service = local
// const service = VITE_LOCAL === 'true' ? local : remote
export const wbService = {
  getEmptyElement,
  getEmptyWb,
  getDefaultFilter,
  ...service,
}

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.wbService = wbService
