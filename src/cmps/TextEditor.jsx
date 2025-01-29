import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export function TextEditor({ noteTxt, onSetNote }) {

    function handleEditorChange(value) {
        onSetNote('noteTxt', value)
    }

    return (
        <div className="text-editor">

            <ReactQuill
                value={noteTxt}
                onChange={handleEditorChange}
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike', { 'background': [] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6] }, { 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }, 'image'],
                        ['link'],
                        ['clean'],
                        [{ 'font': [] }, { 'color': [] }, { 'align': [] }, { 'indent': '-1' }, { 'indent': '+1' }],
                    ],
                }}

            />
        </div>
    );
}

