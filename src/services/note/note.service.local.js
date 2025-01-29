
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'noteDb'

export const noteService = {
    query,
    getById,
    save,
    remove,
}
window.cs = noteService

const logInUser = {
    id: 123,
    name: 'Carmel Amarilio - Coding Academy'
}

async function query(filterBy) {
    var notes = await storageService.query(STORAGE_KEY)
    const { label, text } = filterBy

    const regex = new RegExp(text, 'i')
    notes = notes.filter(note =>
        regex.test(note.title) ||
        regex.test(note.noteTxt) ||
        regex.test(note.project.name) ||
        regex.test(note.owner.name)
    )

    // switch (label) {
    //     case 'Recent':
    //         notes = notes.filter(({ modified }) => new Date() - new Date(modified[0].at) <= 7 * 24 * 60 * 60 * 1000)
    //         break;
    //     case 'My notes':
    //         notes = notes.filter(({ owner }) => owner.id === logInUser.id)
    //         break;
    //     case 'Shared with me':
    //         notes = notes.filter(({ owner }) => owner.id != logInUser.id)
    //         break;
    //     case 'Starred':
    //         notes = notes.filter(({ isStar }) => isStar)
    //         break;
    //     case 'Trash':
    //         notes = notes.filter(({ isTrash }) => isTrash)
    //         break;
    // }

    return notes
}

function getById(noteId) {
    return storageService.get(STORAGE_KEY, noteId)
}

async function remove(noteId) {
    await storageService.remove(STORAGE_KEY, noteId)
}

async function save(note) {
    var savedNote
    if (note._id) {
        savedNote = await storageService.put(STORAGE_KEY, note)
    } else {
        savedNote = await storageService.post(STORAGE_KEY, note)
    }
    return savedNote
}



_createAdmin()
async function _createAdmin() {
    let notes = await storageService.query(STORAGE_KEY)
    if (notes && notes.length > 0) return;

    notes = [
        {
            title: 'Carmel Amarilio1 - Coding Academy 26/01/2025, 16:33:2',
            isStar: false,
            isTrash: false,
            noteTxt: 'Text here',
            owner: {
                id: 123,
                name: 'Carmel Amarilio - Coding Academy'
            },
            project: {
                id: 123,
                name: 'Zoom-CA'
            },
            modified: [
                {
                    at: '5.3.24',
                    by: {
                        id: 123,
                        name: "Carmel Amarilio - Coding Academy",
                    }
                }
            ]
        },
        {
            title: 'Carmel Amarilio2 - Coding Academy 26/01/2025, 16:33:26',
            isStar: true,
            isTrash: false,
            noteTxt: 'Text here',
            owner: {
                id: 123,
                name: 'Carmel Amarilio - Coding Academy'
            },
            project: {
                id: 123,
                name: 'Zoom-CA'
            },
            modified: [
                {
                    at: '5.3.24',
                    by: {
                        id: 123,
                        name: "Carmel Amarilio - Coding Academy",
                    }
                }
            ]
        },
        {
            title: 'Carmel Amarilio3 - Coding Academy 26/01/2025, 16:33:26',
            isStar: true,
            isTrash: false,
            noteTxt: 'Text here',
            owner: {
                id: 123,
                name: 'Carmel Amarilio - Coding Academy'
            },
            project: {
                id: 123,
                name: 'Zoom-CA'
            },
            modified: [
                {
                    at: '5.3.24',
                    by: {
                        id: 123,
                        name: "Carmel Amarilio - Coding Academy",
                    }
                }
            ]
        },
        {
            title: 'Carmel Amarilio4 - Coding Academy 26/01/2025, 16:33:26',
            isStar: false,
            isTrash: false,
            noteTxt: 'Text here',
            owner: {
                id: 123,
                name: 'Carmel Amarilio - Coding Academy'
            },
            project: {
                id: 123,
                name: 'Zoom-CA'
            },
            modified: [
                {
                    at: '5.3.24',
                    by: {
                        id: 123,
                        name: "Carmel Amarilio - Coding Academy",
                    }
                }
            ]
        },
    ]
    for (const note of notes) {
        await storageService.post(STORAGE_KEY, note);
    }
}
