import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";

import GIcon from "./GIcon";

export function NotesList({ notes, onStar, onTrash }) {
    const navigate = useNavigate();
    const [selectedNote, setSelectedNote] = useState(null)
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })
    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setSelectedNote(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    function onNode(_id) {
        navigate(`/note/${_id}`)
    }

    function onRightClick(event, note) {
        event.preventDefault()
        setModalPosition({ x: event.clientX, y: event.clientY })
        setSelectedNote(note)
    }

    function onMore(event, note) {
        event.stopPropagation()
        const rect = event.currentTarget.getBoundingClientRect()
        setModalPosition({ x: (rect.right - 120), y: (rect.top + 20) })
        setSelectedNote(note)
    }



    return (
        <section className="notes-list" >
            <table className="table-auto w-full border-collapse border-spacing-y-2 text-sm">
                <thead >
                    <tr >
                        <th className="w-5"><input type="checkbox" /></th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Starred</th>
                        <th className="px-4 py-2 text-left">Owner</th>
                        <th className="px-4 py-2 text-left">Project</th>
                        <th className="px-4 py-2 text-left">Modified</th>
                        <th className="px-4 py-2 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note) => (
                        <tr key={note._id} className="bg-white hover:bg-gray-50 border-b border-gray-200" onClick={() => onNode(note._id)} onContextMenu={(e) => onRightClick(e, note)}>
                            <td className="px-4 py-3 text-left"><input type="checkbox" /></td>
                            <td className="px-4 py-3 text-left w-64 font-medium">{note.title}</td>
                            <td className="px-4 py-3 text-left text-center">
                                <button onClick={(e) => { e.stopPropagation(); onStar(note) }}>
                                    {note.isStar ? <GIcon iconName={'Star'} /> : <GIcon iconName={'StarBorder'} />}
                                </button>
                            </td>
                            <td className="px-4 py-3 text-left w-44">{note.owner.name}</td>
                            <td className="px-4 py-3 text-left">{note.project.name}</td>
                            <td className="px-4 py-3 text-left w-46">{note.modified[0].at} by {note.modified[0].by.name}</td>
                            <td className="px-4 py-3 text-left">
                                <div className="flex gap-2">
                                    <button ><GIcon iconName={'Share'} /></button>
                                    <button className="relative" onClick={(e) => onMore(e, note)}><GIcon iconName={'MoreIcon'} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedNote && <div className="modal" ref={modalRef} style={{ top: `${modalPosition.y}px`, left: `${modalPosition.x}px`, }}>
                <button className="p-1 text-start rounded-[5px]">Lock</button>
                <button className="p-1 text-start rounded-[5px]">Rename</button>
                <button className="p-1 text-start rounded-[5px]">Duplicated</button>
                <button className="p-1 text-start rounded-[5px]" onClick={() => onTrash(selectedNote)}>Move to trash</button>
            </div>}

        </section>
    )
}