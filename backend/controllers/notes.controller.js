<<<<<<< HEAD
import {getUserNoteService, createNoteService, updateNoteService, deleteNoteService, getNoteByIdService} from '../services/notes.service.js';
=======
import {searchNotesService, getNotesService, createNoteService, updateNoteService, deleteNoteService, getNoteByIdService} from '../services/notes.service.js';
>>>>>>> backend-dev
import errorMsg from '../utils/error.js'; 
import Notes from '../models/notes.model.js';

// create note
export const createNoteController = async (req, res) => {
    const userId = req.userId;
    const {title, description} = req.body;
    try {
        const note = await createNoteService(userId, title, description);
        res.status(201).json(note);
        console.log(`created note ${note.id}`);
    }
    catch(err) {
        errorMsg(res, err);
    }
};

// get user's notes
<<<<<<< HEAD
export const getUserNoteController = async (req, res) => {
    const userId = req.userId;
    try {
        const notes = await getUserNoteService(userId);
        res.json(notes);
        console.log(`got notes ${userId}`);
    }
    catch(err) {
        errorMsg(res, err);
    }
=======
export const getNotesController = async (req, res) => {
  try {
    const userId = req.userId;

    // sort by query
    const sortBy = req.query.sortBy || "updatedAt";
    const order = req.query.order === "asc" ? "ASC" : "DESC";

    const notes = await getNotesService(userId, sortBy, order);
    res.json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// search notes by {query}
// {query} = word in search bar
export const searchNotesController = async (req, res) => {
  try {
    const userId = req.userId;
    const { query } = req.query;

    const notes = await searchNotesService(userId, query);
    res.json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
>>>>>>> backend-dev
};

// update note
export const updateNoteController = async (req, res) => {
const {id} = req.params;
    const data = req.body;
    const note = await getNoteByIdService(id);
    try {
        
        if (!note) return res.status(404).json({ error: 'Note not found' });
        if (note.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

        await updateNoteService(id, data);
        res.json({message: 'Note updated'});
        console.log(`updated note ${id}`);
    }
    catch(err) {
        errorMsg(res, err);
    }
};

// delete note
export const deleteNoteController = async (req, res) => {
    const {id} = req.params;
    const note = await getNoteByIdService(id);
    try {
        
        if (!note) return res.status(404).json({ error: 'Note not found' });
        if (note.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

        await deleteNoteService(id);
        res.json({message: 'Note deleted'});
        console.log(`deleted note ${id}`);
    }
    catch(err) {
        errorMsg(res, err);
    }
};

export default {
<<<<<<< HEAD
    createNoteController, getUserNoteController, updateNoteController, deleteNoteController
=======
    createNoteController, searchNotesController, getNotesController, updateNoteController, deleteNoteController
>>>>>>> backend-dev
};