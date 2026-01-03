//notes.controller.js
import {searchNotesService, readNoteService, getNotesService, createNoteService, updateNoteService, deleteNoteService} from '../services/notes.service.js';
import errorMsg from '../utils/error.js';

// create note
export const createNoteController = async (req, res) => {
    const userId = req.userId;
    let {title, description} = req.body;
    try {
    // Validate title
    if (!title || typeof title !== "string") {
      title = "Untitled"; // fallback
    }

    // Validate description
    if (!description) {
      return res.status(400).json({ error: "Description is required." });
    }

    // If description is an array, stringify it; if string, try parsing to ensure valid JSON
    if (Array.isArray(description)) {
      description = JSON.stringify(description);
    } else if (typeof description === "string") {
      try {
        JSON.parse(description); // ensure it's valid JSON
      } catch {
        return res.status(400).json({ error: "Description must be valid JSON." });
      }
    } else {
      return res.status(400).json({ error: "Description must be a string or an array." });
    }

    const note = await createNoteService(userId, title, description);
    res.status(201).json(note.toJSON());
    console.log(`created note ${note.id}`);
  } catch (err) {
    errorMsg(res, err);
  }
};

// get user's notes
export const getNotesController = async (req, res) => {
  try {
    const userId = req.userId;

    // sort by query
    const sortBy = req.query.sortBy || "updatedAt";
    const order = req.query.order === "asc" ? "ASC" : "DESC";

    const notes = await getNotesService(userId, sortBy, order);
    res.json(notes.map(n => n.toJSON()));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const readNoteController = async (req, res) => {
  try {
    const userId = req.userId;        // from authMiddleware
    const id = req.params.id;     // from URL

    const note = await readNoteService(id, userId);

    res.status(200).json(note.toJSON());
  }
  catch (err) {
    res.status(400).json({error: err.message});
  }
}

// search notes by {query}
// {query} = word in search bar
export const searchNotesController = async (req, res) => {
  try {
    const userId = req.userId;
    const { query } = req.query;

    const notes = await searchNotesService(userId, query);
    res.json(notes.map(n => n.toJSON()));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update note
export const updateNoteController = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  let { title, description } = req.body;

  const note = await readNoteService(id, userId);
  try {
    if (!note) return res.status(404).json({ error: 'Note not found' });
    if (note.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    // Validate title
    if (title && typeof title !== "string") {
      return res.status(400).json({ error: "Title must be a string" });
    }

    // Validate description
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    if (Array.isArray(description)) {
      description = JSON.stringify(description);
    } else if (typeof description === "string") {
      try {
        JSON.parse(description); // ensure it's valid JSON
      } catch {
        return res.status(400).json({ error: "Description must be valid JSON" });
      }
    } else {
      return res.status(400).json({ error: "Description must be a string or array" });
    }

    const updatedNote = await updateNoteService(id, userId, { title, description });
    res.json({ updatedNote });
    console.log(`updated note ${id}`);
  } catch (err) {
    errorMsg(res, err);
  }
};


// delete note
export const deleteNoteController = async (req, res) => {
    const {id} = req.params;
    const userId = req.userId;
    const note = await readNoteService(id, userId);
    try {
        
        if (!note) return res.status(404).json({ error: 'Note not found' });
        if (note.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

        await deleteNoteService(id, userId);
        res.json({message: 'Note deleted'});
        console.log(`deleted note ${id}`);
    }
    catch(err) {
        errorMsg(res, err);
    }
};

export default {
    createNoteController, searchNotesController, getNotesController, updateNoteController, deleteNoteController
};