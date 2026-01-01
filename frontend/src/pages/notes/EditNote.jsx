// src/pages/notes/EditNote.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import NoteTitleBar from "./components/NoteTitleBar.jsx";
import NoteBodyEditor from "./components/NotesBodyEditor.jsx";
import { useNoteEditor } from "../../hooks/noteEditHooks.js";
import { useLocalTime } from "../../hooks/localTime";

const EditNote = ({ note, onClose }) => {

  // create note editor
  const editor = useCreateBlockNote();
  const { title, setTitle, saveNote, deleteNote, lastModified, lastCreated, setTimestamps } = useNoteEditor(editor);

  useEffect(() => {
  if (!note || !editor) return;

  setTitle(note.title);
  setTimestamps(note.lastModified, note.lastCreated);

  if (note.description && note.description.length > 0) {
      const blocks =
        typeof note.description === "string"
          ? JSON.parse(note.description)
          : note.description;

      editor.replaceBlocks(editor.topLevelBlocks, blocks);
    }
  }, [note, editor, setTitle, setTimestamps]);

  // Save handler updates description as JSON string
  const handleSave = () => {
    const updatedNote = saveNote();
    updatedNote.description = JSON.stringify(editor.exportJson()); // save as string for backend
    console.log("Note ready to save to backend:", updatedNote);
    // TODO: call your API update here
  };

  return (
    <div>
      <div onClick={(e) => e.stopPropagation()}>
      <NoteTitleBar
        title={title}
        setTitle={setTitle}
        onSave={saveNote}
        onDelete={deleteNote}
      />
      <p>Last modified: {useLocalTime(lastModified)}</p>
      <p>Created: {useLocalTime(lastCreated)}</p>
      <NoteBodyEditor editor={editor} />
      </div>
    </div>
  );
};

export default EditNote;
