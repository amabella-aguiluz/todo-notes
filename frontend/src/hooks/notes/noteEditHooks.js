// src/hooks/noteEditHooks.js
import { useState } from "react";
import { authFetch } from "../auth/authFetch";

export const useNoteEditor = (editor, noteId) => {
  // change title
  const [title, setTitle] = useState("");
  const [updatedAt, setUpdatedAt] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);

  const setTimestamps = (updated, created) => {
    setUpdatedAt(updated);
    setCreatedAt(created);
  };

  const saveNote = async () => {
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
    try {
      const res = await authFetch(
        noteId ? `/api/notes/${noteId}` : "/api/notes",
        {
          method: noteId ? "PUT" : "POST",
          body: JSON.stringify(noteData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to save note");
      }
      const savedNote = await res.json();
    }
    catch(err) {
      console.error("Save failed: ", err.message);
      alert(err.message);
    }
  };

  const deleteNote = async () => {
    try {
      const res = await authFetch(`/api/notes/${noteId}`, {
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

export default useNoteEditor;