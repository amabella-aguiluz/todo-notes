import express from 'express';
import {createNoteController, getNotesController,  searchNotesController, updateNoteController, deleteNoteController} from '../controllers/notes.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.use(authMiddleware); // Protect all routes
router.get('/search', searchNotesController); // search for a note by {query}
router.get('/', getNotesController); // get a user's notes
router.post('/', createNoteController); // create note
router.put('/:id', updateNoteController); // update a note
router.delete('/:id', deleteNoteController); // delete a note

export default router;
