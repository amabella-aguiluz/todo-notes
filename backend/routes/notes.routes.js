import express from 'express';
import {createNoteController, getUserNoteController, updateNoteController, deleteNoteController} from '../controllers/notes.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.use(authMiddleware); // Protect all routes
router.get('/', getUserNoteController);
router.post('/', createNoteController);
router.put('/:id', updateNoteController);
router.delete('/:id', deleteNoteController);

export default router;
