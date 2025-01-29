import { useEffect, useState } from "react"

import { noteService } from "../services/note/note.service.local"

import GIcon from "../cmps/GIcon"
import { NotesList } from "../cmps/NotesList"
import { ActionSidebar } from "../cmps/ActionSidebar"
import { NotFoundActions } from "../cmps/NotFoundActions"


const logInUser = {
    id: 123,
    name: 'Carmel Amarilio - Coding Academy'
}

export function NoteIndex() {
    const [allNotes, setAllNotes] = useState(null)
    const [notesToDisplay, setNotesToDisplay] = useState(null)
    const [filter, setFilter] = useState({ label: 'All notes', text: '' })

    useEffect(() => { loadNotes() }, [filter.text])
    useEffect(() => { filterByLabel() }, [filter.label])


    async function loadNotes() {
        try {
            const notes = await noteService.query(filter)
            setAllNotes(notes)
            setNotesToDisplay(notes)
        } catch (error) {
            console.log(error);
        }
    }

    function filterByLabel() {
        if (!allNotes) return
        const { label } = filter
        let notes = allNotes
        switch (label) {
            case 'All notes':
                notes = notes.filter(({ isTrash }) => !isTrash)
                break;
            case 'Recent':
                notes = notes.filter(({ modified }) => new Date() - new Date(modified[0].at) <= 7 * 24 * 60 * 60 * 1000)
                break;
            case 'My notes':
                notes = notes.filter(({ owner }) => owner.id === logInUser.id)
                break;
            case 'Shared with me':
                notes = notes.filter(({ owner }) => owner.id != logInUser.id)
                break;
            case 'Starred':
                notes = notes.filter(({ isStar }) => isStar)
                break;
            case 'Trash':
                notes = notes.filter(({ isTrash }) => isTrash)
                break;
        }

        setNotesToDisplay(notes)
    }

    function onSetFilter(label) {
        setFilter(prev => ({ ...prev, label }))
    }

    function handleChange(ev) {
        const { name, value } = ev.target
        setFilter(prev => ({ ...prev, [name]: value }))
    }

    function onStar(note) {
        note.isStar = !note.isStar
        saveNote(note)
    }

    function onTrash(note) {
        note.isTrash = !note.isTrash
        saveNote(note)
    }


    async function saveNote(noteToSave) {
        setAllNotes(prev => prev.map(n => n._id === noteToSave._id ? noteToSave : n))
        filterByLabel()
        try {
            await noteService.save(noteToSave)
        } catch (error) {
            console.log(error);
        }
    }

    function onNewNote() {
        console.log('new note');
    }

    if (!notesToDisplay) return <h1>loading...</h1>;
    return (
        <section className="note-index">
            <ActionSidebar onSetFilter={onSetFilter} label={filter.label} operator={'note'} />
            <main className="notes-container grid grid-rows-[max-content_1fr]">
                <article className="notes-header">
                    <h1>{filter.label}</h1>
                    <button className="prime-btn">New</button>
                </article>
                {notesToDisplay.length ?
                    <section className="notes-main p-8">
                        <div className="search">
                            <label htmlFor="search"><GIcon iconName={'Search'} /></label>
                            <input type="text" name="text" id="search" onChange={handleChange} value={filter.text} placeholder="search" />
                        </div>
                        <NotesList notes={notesToDisplay} onStar={onStar} onTrash={onTrash} />
                    </section> :
                    <NotFoundActions label={filter.label} operator={'note'} CBF={onNewNote} />
                }
            </main>
        </section>
    )
}