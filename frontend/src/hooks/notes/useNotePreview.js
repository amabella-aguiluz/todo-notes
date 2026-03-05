// src/hooks/notes/useNotesPreview.js
import { useState, useEffect, useMemo } from "react";

export const useNoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await authFetch("/api/notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error("Failed to fetch notes:", err.message);
        setNotes([]);
      } finally {
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