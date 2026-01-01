// src/hooks/useNotesPreview.js
import { useState, useEffect } from "react";
import noteSample from "./noteSample";

export const useNotePreview = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // pretend to call getNotes
    const fetchNotes = async () => {
      setLoading(true);
      try {
        // Example API call placeholder
        // const response = await fetch('/api/notes');
        // const data = await response.json();

        const sample = await noteSample();
        const data = sample.map((note) => ({
          ...note,
          // parse description JSON for editor or preview
          description: note.description || [],
        }));
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
