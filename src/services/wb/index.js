const { DEV, VITE_LOCAL } = import.meta.env

// import { makeId } from '../util.service'

import { wbService as local } from './wb.service.local'
// import { wbService as remote } from './wb.service.remote'

function getEmptyWb() {
	return {
		// id: makeId(),
		owner: 'Moishee',
		shapes: [],
	}
}

function getDefaultFilter() {
    return {
        txt: '',
        minSpeed: '',
        sortField: '',
        sortDir: '',
    }
}

const service =  local 
// const service = VITE_LOCAL === 'true' ? local : remote
export const wbService = { getEmptyWb, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.wbService = wbService
