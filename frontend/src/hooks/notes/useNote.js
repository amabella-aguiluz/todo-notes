// combine the ff hooks:
// useNoteEditor
// useEditNoteLoader
// useNoteSave 

import { useState, useEffect } from "react";
import { notesApi } from "../../services/notes.service";

// save / delete note using notesservice
// exposes editor instance for editing

export const deleteNote = async () => {
    if (!note_id) return;
    try {
        await notesApi.deleteNote(note_id);
    } catch (err) {
        console.error("Failed to delete note:", err.message);
        throw err;
    }
};

// Save note
export const saveNote = async (updatedData = {}) => {
    const now = new Date().toISOString();
    setUpdatedAt(now);
    if (!created_at) setCreatedAt(now);

    const noteData = { title, description, ...updatedData };

    try {
        let saved;
        if (note_id) {
            saved = await notesApi.updateNote(note_id, noteData.title, noteData.description);
        } else {
            saved = await notesApi.createNote(noteData.title, noteData.description);
        }
        return saved;
    } catch (err) {
        console.error("Failed to save note:", err.message);
        throw err;
    }
};

export const useNote = ({ note_id,
    editor }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [created_at, setCreatedAt] = useState(null);
    const [updated_at, setUpdatedAt] = useState(null);
    const [loading, setLoading] = useState(false);

    // load note if it exists
    useEffect(() => {
        if (!note_id) return;

        let cancelled = false;

        const loadNote = async () => {
            setLoading(true);
            try {
                console.log("Loading note_id:", note_id);
                const note = await notesApi.getNoteById(note_id);
                if (cancelled) return;

                // store title and timestamps
                setTitle(note.title);
                setCreatedAt(note.created_at);
                setUpdatedAt(note.updated_at);
                setDescription(note.description || "");

                // set editor content if it exists
                if (editor) {
                    editor.commands.setContent(note.description || "");
                }
                } catch (err) {
                    console.error("Failed to load note:", err.message);
                } finally {
                    setLoading(false);
                }
            };

            loadNote();

            return () => {
                cancelled = true;
            };
        }, [note_id, editor]);

    return {
        title,
        setTitle,
        description,
        setDescription,
        created_at,
        updated_at,
        loading,
        saveNote,
        deleteNote,
    };
};