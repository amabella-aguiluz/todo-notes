import express from 'express';
const router = express.Router();
import noteController from '../controllers/noteController';
import authMiddleware from '../middlewares/auth';

router.use(authMiddleware); // Protect all routes
router.get('/', noteController.getNotes);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
