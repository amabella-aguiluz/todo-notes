import Notes from '../models/notes.model.js';

export const createNote = async (userId, title, description) => {
    return Notes.create({userId, title, description});
};

// get user notes
export const getUserNote = async(userId) => {
    return Notes.findAll( {where: {userId} });
};

// update notes
export const updateNotes = async(id, data) => {
    return Notes.update(data, {where: {id} });
};

//delete notes
export const deleteNotes = async(id) => {
    return Notes.destroy( {where: {id} } );
};

export default {
    createNote,
    getUserNote,
    updateNotes,
    deleteNotes
};

