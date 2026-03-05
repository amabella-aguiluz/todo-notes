// src/hooks/notes/useNotesPreview.js
import { useState, useEffect, useMemo } from "react";
import { notesApi } from "../../services/notes.service";


export const useNoteList = ({ searchQuery = "", sortBy = "updated_at", order = "desc" } = {}) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const data = await notesApi.getUserNotes(sortBy, order); // filtering is optional, depends on user
        // if no input, then just return def: descending, by updated_at
        setNotes(data);
      } catch (err) {
        console.error("Failed to fetch notes:", err.message);
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [sortBy, order]);

  // Filter notes locally by search query
  const filteredNotes = useMemo(() => {
    if (!searchQuery) return notes;
    const q = searchQuery.toLowerCase();
    return notes.filter(
      note =>
        note.title?.toLowerCase().includes(q) ||
        note.description?.toLowerCase().includes(q)
    );
  }, [searchQuery, notes]);


  return { notes: filteredNotes, loading };
};



// preview content of note
export const useNotePreviewContent = (description) => {
  return useMemo(() => {
    if (!description) return null;

    try {
      // If description is HTML, we can return a preview by stripping tags
      // or just returning it as-is. Here we’ll grab the text content.
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = description;
      const text = tempDiv.textContent || tempDiv.innerText || "";

      // Return first 1–2 sentences or a truncated preview
      return text.length > 100 ? text.slice(0, 100) + "..." : text;
    } catch (err) {
      console.error("Invalid note description HTML:", err);
      return null;
    }
  }, [description]);
};