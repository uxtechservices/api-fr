import express from 'express';
import { initDB, getLocker, getAll, createNewLocker, updateExistingLocker, deleteExistingLocker, assignExistingLocker, unassignExistingLocker } from '../controllers/lockerController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import { validateCreateLocker } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.get('/init', initDB);

// Example of applying authentication middleware to specific routes
router.get('/:lockerId', authenticateToken, getLocker);
router.get('/', authenticateToken, getAll);

// Example of applying validation middleware before creating a locker
router.post('/', authenticateToken, validateCreateLocker, createNewLocker);
router.put('/:lockerId', authenticateToken, updateExistingLocker);
router.delete('/:lockerId', authenticateToken, deleteExistingLocker);
router.post('/:lockerId/assign', authenticateToken, assignExistingLocker);
router.post('/:lockerId/unassign', authenticateToken, unassignExistingLocker);

export default router;