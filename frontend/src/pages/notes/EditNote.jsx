// src/components/NoteEditor.jsx
import React, { useState } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import NoteTitleBar from "./components/NoteTitleBar.jsx";
import NoteBodyEditor from "./components/NotesBodyEditor.jsx";
import { useNoteEditor } from "../../hooks/noteEditHooks.js";

const EditNote = () => {
// create note editor
  const editor = useCreateBlockNote();

//   initialize functions
  const { title, setTitle, saveNote, deleteNote } = useNoteEditor(editor);

  return (
    <div>
      <NoteTitleBar
        title={title}
        setTitle={setTitle}
        onSave={saveNote}
        onDelete={deleteNote}
      />
      <NoteBodyEditor editor={editor} />
    </div>
  );
};

export default EditNote;
