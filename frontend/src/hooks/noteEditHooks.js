// src/hooks/useNoteEditor.js
import { useState, useEffect } from "react";

export const useNoteEditor = (editor) => {
  // change title
  const [title, setTitle] = useState("");

  const saveNote = () => {
    if (!editor) return;
    // export body to json
    const bodyJSON = editor.exportJson();
    const noteData = {
      title,
      body: bodyJSON,
    };
    console.log("Saved note:", noteData);
    return noteData;
  };

  const deleteNote = () => {
    // clear title
    setTitle("");
    // clear body
    if (editor) editor.clearEditor();
  };

  return {
    title,
    setTitle,
    saveNote,
    deleteNote,
  };
};
