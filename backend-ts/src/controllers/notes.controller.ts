import {searchNotesService, getNotesService, createNoteService, updateNoteService, deleteNoteService, getNoteByIdService} from '../services/notes.service.js';
import {Request, Response} from "express";
import { sort_fields, order, sortBy, orderBy } from "../types/sortBy";



// Extend Request to include user_id from auth middleware
interface AuthRequest extends Request {
  user_id: number;
}

// create note
export const createNoteController = async (req: AuthRequest, res: Response) => {
    const user_id = req.user_id;
    const {title, description} = req.body;
    try {
        const note = await createNoteService(user_id, title, description);
        res.status(201).json(note);
        console.log(`created note ${note.user_id}`);
    }
    catch(err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// get user's notes
export const getNotesController = async (req: AuthRequest, res: Response) => {
  try {
    const rawSortBy = req.query.sortBy;
    const rawOrder = req.query.order;

    // validate sort field
    const sort: sortBy =
      typeof rawSortBy === "string" && sort_fields.includes(rawSortBy as sortBy)
        ? (rawSortBy as sortBy)
        : "updated_at";

    // validate order
    const ord: orderBy =
      rawOrder === "asc" ? "asc" : "desc";

    const notes = await getNotesService(req.user_id, sort, ord);
    res.json(notes);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// search notes by {query}
// {query} = word in search bar
export const searchNotesController = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user_id;
    const { query } = req.query;
    if (!(query === 'string')) return res.status(400).json({ error: "Query must be a string"});
    if (!query) return res.status(400).json({ error: "Query is required" });

    const notes = await searchNotesService(user_id, query);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// update note
export const updateNoteController = async (req: AuthRequest, res: Response) => {
    const note_id = req.params.note_id;
    const data = req.body;
    const note = await getNoteByIdService(Number(note_id));
    try {
        
        if (!note) return res.status(404).json({ error: 'Note not found' });
        if (note.user_id !== req.user_id) return res.status(403).json({ error: 'Unauthorized' });

        await updateNoteService(Number(note_id), data);
        res.json({ message: "Note updated" });
        console.log(`Updated note ${note_id}`);
  }
    catch(err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// delete note
export const deleteNoteController = async (req: AuthRequest, res: Response) => {
    const note_id = req.params.note_id;
  try {
    const note = await getNoteByIdService(Number(note_id));
    if (!note) return res.status(404).json({ error: "Note not found" });
    if (note.user_id !== req.user_id) return res.status(403).json({ error: "Unauthorized" });

    await deleteNoteService(Number(note_id));
    res.json({ message: "Note deleted" });
    console.log(`Deleted note ${note_id}`);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export default {
    createNoteController, searchNotesController, getNotesController, updateNoteController, deleteNoteController
};