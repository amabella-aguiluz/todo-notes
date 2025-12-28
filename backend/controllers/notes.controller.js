import {getUserNoteService, createNoteService, updateNoteService, deleteNoteService, getNoteByIdService} from '../services/notes.service.js';
import errorMsg from '../utils/error.js'; 
import Notes from '../models/notes.model.js';

export const createNoteController = async (req, res) => {
    const userId = req.userId;
    const {title, description} = req.body;
    try {
        const note = await createNoteService(userId, title, description);
        res.status(201).json(note);
        console.log(`created note ${note.id}`);
    }
    catch(err) {
        errorMsg();
    }
};

export const getUserNoteController = async (req, res) => {
    const userId = req.userId;
    try {
        const notes = await getUserNoteService(userId);
        res.json(notes);
        console.log(`got notes ${userId}`);
    }
    catch(err) {
        errorMsg();
    }
};

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
        errorMsg();
    }
};

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
        errorMsg();
    }
};

export default {
    createNoteController, getUserNoteController, updateNoteController, deleteNoteController
};