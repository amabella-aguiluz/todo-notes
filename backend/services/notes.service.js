import Notes from '../models/notes.model.js';
<<<<<<< HEAD
=======
import {Op} from 'sequelize';
>>>>>>> backend-dev

// create notes
export const createNoteService = async (userId, title, description) => {
    return Notes.create({userId, title, description});
};

// get user notes
export const getUserNoteService = async(userId) => {
    return Notes.findAll( {where: {userId} });
};

// update notes
<<<<<<< HEAD
=======
export const getNotesService = async (userId, sortBy, order) => {
  const allowedSortFields = ["title", "createdAt", "updatedAt"];
  if (!allowedSortFields.includes(sortBy)) {
    throw new Error("Invalid sort field");
  }

  return await Notes.findAll({
    where: { userId },
    order: [[sortBy, order]],
  });
};

// search notes by {query}
// {query} = word in search bar
export const searchNotesService = async (userId, query) => {
  if (!query) {
    throw new Error("Search query is required");
  }

  return await Notes.findAll({
    where: {
      userId,
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } },
      ],
    },
  });
};

// update notes
>>>>>>> backend-dev
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

<<<<<<< HEAD
export default {getUserNoteService, createNoteService, updateNoteService, deleteNoteService, getNoteByIdService};
=======
export default {getNotesService, searchNotesService, createNoteService, updateNoteService, deleteNoteService, getNoteByIdService};
>>>>>>> backend-dev
