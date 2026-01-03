// src/pages/notes/EditNote.jsx
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import NoteTitleBar from "./components/NoteTitleBar.jsx";
import NoteBodyEditor from "./components/NotesBodyEditor.jsx";
import { useNoteEditor } from "../../hooks/noteEditHooks";
import { useLocalTime } from "../../hooks/localTime";
import { editNoteLoader } from "../../hooks/editNoteLoader";
import { useNoteSave } from "../../hooks/useNoteSave";

const EditNote = ({ note }) => {
  const editor = useCreateBlockNote();

  const {
    title,
    setTitle,
    saveNote,
    deleteNote,
    updatedAt,
    createdAt,
    setTimestamps,
  } = useNoteEditor(editor, noteId);

  editNoteLoader({
    noteId: note?.id,
    editor,
    setTitle,
    setTimestamps,
  });

  const { onSave, saving } = useNoteSave(note?.id, saveNote);


  return (
    <div onClick={e => e.stopPropagation()}>
      <NoteTitleBar
        title={title}
        setTitle={setTitle}
        onSave={onSave}
        saving={saving}
        onDelete={deleteNote}
      />

      <p>Last modified: {useLocalTime(updatedAt)}</p>
      <p>Created: {useLocalTime(createdAt)}</p>

      <NoteBodyEditor editor={editor} />
    </div>
  );
};

export default EditNote;