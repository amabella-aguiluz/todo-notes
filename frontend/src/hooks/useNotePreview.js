// src/hooks/getNotesPreview.js
import { useState, useEffect } from "react";

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
        
        const data = [
          { id: 1, title: "Note 1", description: "Lorem ipsum", lastModified:"2025-01-10T14:30:00Z" },
          { id: 2, title: "Note 2", description: "Dolor sit amet", lastModified:"2025-02-15T09:45:00Z" },
        ]; // mock data
        
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
