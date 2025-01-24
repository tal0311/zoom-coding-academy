
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'wb'

export const wbService = {
    query,
    getById,
    save,
    remove,
    addWbMsg
}
window.cs = wbService
// TODO: Implement functions
// BUG: sortField and sortDir are not used


async function query(filterBy = {txt:'' }) {
    var wbs = await storageService.query(STORAGE_KEY)
    const { txt} = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        wbs = wbs.filter(wb => regex.test(wb.vendor) || regex.test(wb.description))
    }
    
    return wbs
}

// async function createWb() {

// }

function getById(wbId) {
    return storageService.get(STORAGE_KEY, wbId)
}

async function remove(wbId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, wbId)
}

async function save(wb) {
    var savedWb
    if (wb._id) {
        // const wbToSave = {
        //     _id: wb._id,
        //     price: wb.price,
        //     speed: wb.speed,
        // }
        savedWb = await storageService.put(STORAGE_KEY, wb)
    } else {
        // const wbToSave = {
        //     vendor: wb.vendor,
        //     price: wb.price,
        //     speed: wb.speed,
        //     // Later, owner is set by the backend
        //     owner: userService.getLoggedInUser() || 'Moishe',
        //     msgs: []
        // }
        savedWb = await storageService.post(STORAGE_KEY, wb)
    }
    return savedWb
}

async function addWbMsg(wbId, txt) {
    // Later, this is all done by the backend
    const wb = await getById(wbId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedInUser(),
        txt
    }
    wb.msgs.push(msg)
    await storageService.put(STORAGE_KEY, wb)

    return msg
}