//hooks/EditNoteLoader.js
import { useEffect } from "react";

export const editNoteLoader = ({
    noteId,
    editor,
    setTitle,
    setTimestamps,
}) => {
    useEffect(() => {
        if (!noteId || !editor) return;

        let cancelled = false;

        fetch(`/api/notes/${noteId}`)
            .then(res => res.json())
            .then(note => {
                if (cancelled) return;

                setTitle(note.title);
                setTimestamps(note.updatedAt, note.createdAt);

                let blocks = [];
                try {
                    blocks = typeof note.description === "string" ? JSON.parse(note.description) : note.description;
                } catch (err) {
                    console.error("Failed to parse note description:", err);
                }
                editor.replaceBlocks(editor.topLevelBlocks, blocks || []);


                return () => {
                    cancelled = true;
                };
            }, [noteId, editor, setTitle, setTimestamps]);
        }
        )
    }