import GIcon from "./GIcon";

export function NotesList({ notes }) {
    return (
        <section className="notes-list">
            <table className="table-auto w-full border-collapse border-spacing-y-2 text-sm">
                <thead >
                    <tr >
                        <th className="w-5"><input type="checkbox" /></th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Starred</th>
                        <th className="px-4 py-2 text-left">Owner</th>
                        <th className="px-4 py-2 text-left">Project</th>
                        <th className="px-4 py-2 text-left">Modified</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note) => (
                        <tr key={note.id} className="bg-white hover:bg-gray-50 border-b border-gray-200">
                            <td className="px-4 py-3 text-left"><input type="checkbox" /></td>
                            <td className="px-4 py-3 text-left w-64 font-medium">{note.name}</td>
                            <td className="px-4 py-3 text-left text-center">{note.isStar ? <GIcon iconName={'Star'} /> : <GIcon iconName={'StarBorder'} />}</td>
                            <td className="px-4 py-3 text-left w-44">{note.owner.name}</td>
                            <td className="px-4 py-3 text-left">{note.project.name}</td>
                            <td className="px-4 py-3 text-left w-46">{note.modified[0].at} by {note.modified[0].by}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}