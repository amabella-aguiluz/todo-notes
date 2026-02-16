//hooks/EditNoteLoader.js
import { useEffect } from "react";
import { authFetch } from "../auth/authFetch";

export const useEditNoteLoader = ({
  noteId,
  editor,
  setTitle,
  setTimestamps,
}) => {
  useEffect(() => {
    if (!noteId || !editor) return;

    let cancelled = false;

    const loadNote = async () => {
      try {
        const res = await authFetch(`/api/notes/${noteId}`);
        const note = await res.json();

        if (cancelled) return;

        setTitle(note.title);
        setTimestamps(note.updatedAt, note.createdAt);

        let blocks = [];
        try {
          blocks =
            typeof note.description === "string"
              ? JSON.parse(note.description)
              : note.description;
        } catch (err) {
          console.error("Failed to parse note description:", err);
        }

        editor.replaceBlocks(editor.topLevelBlocks, blocks || []);
      } catch (err) {
        console.error("Failed to load note:", err.message);
      }
    };

    loadNote();

    return () => {
      cancelled = true;
    };
  }, [noteId, editor, setTitle, setTimestamps]);
};

export default useEditNoteLoader;