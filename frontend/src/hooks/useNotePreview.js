// src/hooks/useNotesPreview.js
import { useState, useEffect, useMemo } from "react";
import noteSample from "./noteSample";

// use list of notes
export const useNoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //  call fetchNotes
    // set page as loading
    // fetch notes api
    // update json update of result
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/notes');
        const data = await res.json();
        setNotes(data);
      }
      // failed error
      catch (error) {
        console.error("Failed to fetch notes:", error);
        setNotes([]);
      }
      // exit loading state
      finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return { notes, loading };
};

// preview content of note
export const useNotePreviewContent = (description) => {
  return useMemo(() => {
    if (!description) return null;

    try {
      const blocks =
        typeof description === "string"
          ? JSON.parse(description)
          : description;

      return blocks?.find(b => b.type === "paragraph") || null;
    } catch (err) {
      console.error("Invalid note description JSON:", err);
      return null;
    }
  }, [description]);
};