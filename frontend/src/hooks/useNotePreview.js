// src/hooks/useNotesPreview.js
import { useState, useEffect, useMemo } from "react";
import noteSample from "./noteSample";


export const useNoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //  call fetchNotes
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/notes');
        const data = await res.json();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return { notes, loading };
};

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