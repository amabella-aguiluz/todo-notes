// src/hooks/useOpenNote.js
import { useState } from "react";

/**
 * Hook to manage opening and closing a note.
 * Returns the current open note and functions to open/close it.
 */
export const useOpenNote = () => {
  const [openNote, setOpenNote] = useState(null);

  const open = (note) => setOpenNote(note);
  const close = () => setOpenNote(null);

  return { openNote, open, close };
};