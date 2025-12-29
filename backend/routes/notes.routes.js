import express from 'express';
<<<<<<< HEAD
import {createNoteController, getUserNoteController, updateNoteController, deleteNoteController} from '../controllers/notes.controller.js';
=======
import {createNoteController, getNotesController,  searchNotesController, updateNoteController, deleteNoteController} from '../controllers/notes.controller.js';
>>>>>>> backend-dev
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.use(authMiddleware); // Protect all routes
<<<<<<< HEAD
router.get('/', getUserNoteController);
router.post('/', createNoteController);
router.put('/:id', updateNoteController);
router.delete('/:id', deleteNoteController);
=======
router.get('/search', searchNotesController); // search for a note by {query}
router.get('/', getNotesController); // get a user's notes
router.post('/', createNoteController); // create note
router.put('/:id', updateNoteController); // update a note
router.delete('/:id', deleteNoteController); // delete a note
>>>>>>> backend-dev

export default router;
