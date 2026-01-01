// src/hooks/noteEditHooks.js
import { useState, useEffect } from "react";

export const useNoteEditor = (editor) => {
  // change title
  const [title, setTitle] = useState("");
  const [lastModified, setLastModified] = useState(null);
  const [lastCreated, setLastCreated] = useState(null);

  const setTimestamps = (modified, created) => {
    setLastModified(modified);
    setLastCreated(created);
  };

  const saveNote = () => {
    if (!editor) return;
    // save date
    const now = new Date().toISOString();
    // set timestamps in state
    setLastModified(now);
    if (!lastCreated) {
      setLastCreated(now);
    }

    // export body to json
    const bodyJSON = editor.exportJson();
    const noteData = {
      title,
      body: bodyJSON,
      lastModified: now,
      lastCreated: lastCreated ?? now,
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
    lastModified,
    lastCreated,
    setTimestamps
  };
}

