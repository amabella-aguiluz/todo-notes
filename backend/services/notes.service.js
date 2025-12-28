import Notes from '../models/notes.model.js';

export const createNoteService = async (userId, title, description) => {
    return Notes.create({userId, title, description});
};

// get user notes
export const getUserNoteService = async(userId) => {
    return Notes.findAll( {where: {userId} });
};

// update notes
export const updateNoteService = async(id, data) => {
    return Notes.update(data, {where: {id} });
};

//delete notes
export const deleteNoteService = async(id) => {
    return Notes.destroy( {where: {id} } );
};

//get note by id
export const getNoteByIdService = async (noteId) => {
  return await Notes.findOne({ where: { id: noteId } });
};

export default {getUserNoteService, createNoteService, updateNoteService, deleteNoteService, getNoteByIdService};