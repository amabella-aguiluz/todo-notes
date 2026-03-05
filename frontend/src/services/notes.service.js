import { api } from "../api/api";

export const createNote = async (title, description) => {
    const { data } = await api.post("/notes", { title, description });
    return data;
}

export const updateNote = async (note_id, title, description) => {
    const { data } = await api.put(`/notes/${note_id}`, { title, description });
    return data;
}

export const deleteNote = async (note_id) => {
    const { data } = await api.delete(`/notes/${note_id}`);
    return data;
}

export const getUserNotes = async (sortBy, order) => {
    // getUserNotes() => returns notes sorted by updated_at desc by default
    // getUserNotes("title", "asc") => returns notes sorted by alphabeical title, ascending

    // check for params (sortBy, order)
    const params = {};
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;

    const { data } = await api.get("/notes", { params });
    return data;
}


export const getNoteById = async (note_id) => {
    const { data } = await api.get(`/notes/${note_id}`);
    return data;
}

export const searchNotes = async (query) => {
    const { data } = await api.get(`/notes/search?query=${encodeURIComponent(query)}`);
    return data;
}

export const notesApi = {
    createNote,
    updateNote,
    deleteNote,
    getUserNotes,
    getNoteById,
    searchNotes
}