// src/hooks/noteEditHooks.js
import { useState } from "react";

export const useNoteEditor = (editor, noteId) => {
  // change title
  const [title, setTitle] = useState("");
  const [updatedAt, setUpdatedAt] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);

  const setTimestamps = (updated, created) => {
    setUpdatedAt(updated);
    setCreatedAt(created);
  };

  const saveNote = () => {
    if (!editor) return;
    // save date
    const now = new Date().toISOString();
    // set timestamps in state
    setUpdatedAt(now);
    if (!createdAt) {
      setCreatedAt(now);
    }

    // export body to json
    const noteData = {
      title,
      description: JSON.stringify(editor.exportJson())
    };
    console.log("Saved note:", noteData);
    return noteData;
  };

  const deleteNote = async () => {
  try {
    const res = await fetch(`/api/notes/${noteId}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete");
    console.log(`Deleted note ${noteId}`);
  } catch (err) {
    console.error(err);
    alert(`Failed to delete note: ${err.message}`);
  }
};


  return {
    title,
    setTitle,
    saveNote,
    deleteNote,
    updatedAt,
    createdAt,
    setTimestamps
  };
}