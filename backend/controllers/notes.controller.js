import noteService from '..servies/notes.service.js';

export const createNote = async (req, res) => {
    const userId = req.userId;
    const {title, description} = req.body;
    try {
        const note = await noteService.createNote(userId, title, description);
        res.status(201).json(note);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
};

export const getNote = async (req, res) => {
    const userId = req.userId;
    try {
        const notes = await noteService.getUserNotes(userId);
        res.json(notes);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
};

export const updateNote = async (req, res) => {
const {id} = req.params;
    const data = req.body;
    try {
        await noteService.updateNote(id, data);
        res.json({message: 'Note updated'});
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
};

export const deleteNote = async (req, res) => {
    const {id} = req.params;
    try {
        await noteService.deleteNote(id);
        res.json({message: 'Note deleted'});
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
};