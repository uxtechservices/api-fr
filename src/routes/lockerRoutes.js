import express from 'express';
import { initDB, getLocker, getAll, createNewLocker, updateExistingLocker, deleteExistingLocker, assignExistingLocker, unassignExistingLocker } from '../controllers/lockerController.js';

const router = express.Router();

router.get('/init', initDB);

router.get('/:lockerId', getLocker);
router.get('/', getAll);
router.post('/', createNewLocker);
router.put('/:lockerId', updateExistingLocker);
router.delete('/:lockerId', deleteExistingLocker);
router.post('/:lockerId/assign', assignExistingLocker);
router.post('/:lockerId/unassign', unassignExistingLocker);

export default router;
