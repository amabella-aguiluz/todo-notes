// src/pages/notes/EditNote.jsx
import {NoteTitleBar, NoteBodyEditor} from "./components/NoteTitleBar.jsx";
import { useLocalTime } from "../../util/localTime.js";
import { useNote } from "../../hooks/notes/useNote.js";
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';


const EditNote = ({ note }) => {
const editor = useEditor({
    extensions: [StarterKit],
    content: '', 
  });

  const {
    title,
    setTitle,
    saveNote,
    deleteNote,
    updated_at,
    created_at,
    setTimestamps,
  } = useNote({note_id: note.note_id, editor});

  return (
    <div onClick={e => e.stopPropagation()}>
      <NoteTitleBar
        title={title}
        setTitle={setTitle}
        onSave={saveNote}
        onDelete={deleteNote}
      />

      <p>Last modified: {useLocalTime(updated_at)}</p>
      <p>Created: {useLocalTime(created_at)}</p>

      <NoteBodyEditor editor={editor} />
    </div>
  );
};

export default EditNote;