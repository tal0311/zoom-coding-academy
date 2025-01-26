import { useEffect, useState } from "react"

import GIcon from "../cmps/GIcon"
import { NotesList } from "../cmps/NotesList"
import { ActionSidebar } from "../cmps/ActionSidebar"
import { NotFoundActions } from "../cmps/NotFoundActions"


const notes = [
    {
        id: 123,
        name: 'Carmel Amarilio - Coding Academy 26/01/2025, 16:33:26',
        isStar: false,
        isTrash: false,
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
                by: 'Carmel Amarilio - Coding Academy'
            }
        ]
    },
    {
        id: 124,
        name: 'Carmel Amarilio - Coding Academy 26/01/2025, 16:33:26',
        isStar: true,
        isTrash: false,
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
                by: 'Carmel Amarilio - Coding Academy'
            }
        ]
    },
    {
        id: 125,
        name: 'Carmel Amarilio - Coding Academy 26/01/2025, 16:33:26',
        isStar: true,
        isTrash: false,
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
                by: 'Carmel Amarilio - Coding Academy'
            }
        ]
    },
    {
        id: 126,
        name: 'Carmel Amarilio - Coding Academy 26/01/2025, 16:33:26',
        isStar: false,
        isTrash: false,
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
                by: 'Carmel Amarilio - Coding Academy'
            }
        ]
    },
]

const logInUser = {
    id: 123,
    name: 'Carmel Amarilio - Coding Academy'
}

export function NoteIndex() {
    const [notesToDisplay, setNotesToDisplay] = useState(notes)
    const [filter, setFilter] = useState({ label: 'All notes', text: '' })

    useEffect(() => {
        const { label, text } = filter
        let filteredNots = notes
        switch (label) {
            case 'Recent':
                filteredNots = notes.filter(({ modified }) => new Date() - new Date(modified[0].at) <= 7 * 24 * 60 * 60 * 1000)
                break;
            case 'My notes':
                filteredNots = notes.filter(({ owner }) => owner.id === logInUser._id)
                break;
            case 'Shared with me':
                filteredNots = notes.filter(({ owner }) => owner.id != logInUser._id)
                break;
            case 'Starred':
                filteredNots = notes.filter(({ isStar }) => isStar)
                break;
            case 'Trash':
                filteredNots = notes.filter(({ isTrash }) => isTrash)
                break;
        }
        console.log(filteredNots);
        setNotesToDisplay(filteredNots)
    }, [filter])

    function onSetFilter(label) {
        setFilter(prev => ({ ...prev, label }))
    }

    function handleChange(ev) {
        const { name, value } = ev.target
        setFilter(prev => ({ ...prev, [name]: value }))
    }

    return (
        <section className="note-index">
            <ActionSidebar onSetFilter={onSetFilter} label={filter.label} operator={'note'} />
            <main className="notes-container">
                <article className="notes-header">
                    <h1>{filter.label}</h1>
                    <button className="prime-btn">New</button>
                </article>
                {notesToDisplay.length ?
                    <section className="notes-main">
                        <div className="search">
                            <label htmlFor="search"><GIcon iconName={'Search'} /></label>
                            <input type="text" name="text" id="search" onChange={handleChange} placeholder="search" />
                        </div>
                        <NotesList notes={notesToDisplay} />
                    </section> :
                    <NotFoundActions label={filter.label} operator={'note'} />
                }
            </main>
        </section>
    )
}