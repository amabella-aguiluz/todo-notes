//notes.service.js
import Notes from '../models/notes.model.js';
import { Op } from 'sequelize';

// create notes
export const createNoteService = async (userId, title, description) => {
  const storedDescription =
    Array.isArray(description) ? JSON.stringify(description) : description;

  return Notes.create({
    userId,
    title,
    description: storedDescription,
  });
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
export const updateNoteService = async (id, userId, data) => {
  try {
    const updateData = { ...data };

    // Ensure description is stored as string
    if (Array.isArray(data.description)) {
      updateData.description = JSON.stringify(data.description);
    }

    const [rowsUpdated] = await Notes.update(updateData, {
      where: { id, userId },
    });

    if (rowsUpdated === 0) {
      throw new Error("No note found or unauthorized");
    }

    const updatedNote = await Notes.findOne({ where: { id, userId } });

    return {
      ...updatedNote.dataValues,
      description:
        typeof updatedNote.description === "string"
          ? (() => {
      try { return JSON.parse(updatedNote.description); }
      catch { return updatedNote.description; }
    })()
  : updatedNote.description,
    };
  } catch (err) {
    console.error("Failed to update note:", err);
    throw err;
  }
};

export const deleteNoteService = async (id, userId) => {
  return Notes.destroy({ where: { id, userId } });
};


export default { getNotesService, readNoteService, searchNotesService, createNoteService, updateNoteService, deleteNoteService, };