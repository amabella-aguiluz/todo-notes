import Notes from '../models/notes.model.js';
import { Op } from 'sequelize';

// create notes
export const createNoteService = async (userId, title, description) => {
  return Notes.create({ userId, title, description });
};

// get user notes
export const getUserNoteService = async (userId) => {
  return Notes.findAll({ where: { userId } });
};

//get singular note
export const readNoteService = async (id, userId) => {
  const note = await Notes.findOne({
    where: { id, userId },
  });
  if (!note) {
    throw new Error('Note not found.');
  }
  return note;
}

// sort notes by criteria
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
export const updateNoteService = async (id, data) => {
  try {
    const updateData = { ...data };

    // If body is an array (BlockNote JSON), stringify it before saving in DB
    if (Array.isArray(data.body)) {
      updateData.body = JSON.stringify(data.body);
    }

    // Always update lastModified timestamp
    updateData.lastModified = new Date().toISOString();

    const [rowsUpdated] = await Notes.update(updateData, { where: { id } });

    if (rowsUpdated === 0) {
      throw new Error("No note found with this ID");
    }

    // Fetch and return the updated note
    const updatedNote = await Notes.findOne({ where: { id } });

    // Parse body if it's stored as string
    const noteBody =
      typeof updatedNote.body === "string" ? JSON.parse(updatedNote.body) : updatedNote.body;

    return {
      ...updatedNote.dataValues,
      body: noteBody,
    };
  } catch (err) {
    console.error("Failed to update note:", err);
    throw err;
  }
};

//delete notes
export const deleteNoteService = async (id) => {
  return Notes.destroy({ where: { id } });
};


export default { getNotesService, readNoteService, searchNotesService, createNoteService, updateNoteService, deleteNoteService, };