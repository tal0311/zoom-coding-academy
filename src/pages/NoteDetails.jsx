import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { noteService } from "../services/note/note.service.local";

import GIcon from "../cmps/GIcon";
import { TextEditor } from "../cmps/TextEditor";



const logInUser = {
    id: 123,
    name: 'Carmel Amarilio - Coding Academy'
}


export function NoteDetails() {
    const navigate = useNavigate()
    const { noteId } = useParams()

    const [note, setNote] = useState(null)

    useEffect(() => {
        loadNote()
    }, [noteId])

    async function loadNote() {
        try {
            const note = await noteService.getById(noteId)
            setNote(note)
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(ev) {
        const { name, value } = ev.target
        onSetNote(name, value)
    }

    function onBack() {
        saveNote()
        navigate('/note')
    }

    function onSetNote(name, value) {
        setNote((prev) => ({ ...prev, [name]: value }))
    }

    async function saveNote() {
        const nawModified = {
            at: new Date(),
            by: logInUser,
        }
        const noteToSave = { ...note, 'modified': [nawModified, ...note.modified] }
        try {
            noteService.save(noteToSave)
        } catch (error) {
            console.log(error);
        }
    }

    if (!note) return <h1>loading...</h1>;
    return (
        <section className="note-details grid grid-rows-[max-content_1fr]">
            <header className="flex items-center p-2.5">
                <div className="flex items-center gap-[20px]">
                    <button onClick={onBack}>
                        <GIcon iconName={"ArrowBack"} />{" "}
                    </button>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        value={note.title}
                        className="p-2 w-[420px] border border-transparent hover:border-gray-300 focus:outline-none"
                    />
                </div>
            </header>

            <TextEditor noteTxt={note.noteTxt} onSetNote={onSetNote} />
        </section>
    );
}

