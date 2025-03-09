import { initializeDatabase, getLockerById, getAllLockers, createLocker, updateLocker, deleteLocker, assignLocker, unassignLocker } from '../models/lockerModel.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const initDB = async (req, res) => {
    try {
        await initializeDatabase();
        return successResponse(res, null, "Database and tables created", 201);
    } catch(error) {
        console.error(error);
        return errorResponse(res, "Failed to initialize DB", 500, [error.message]);
    }
};

const getLocker = async (req, res) => {
  try {
    const lockerId = req.params.lockerId;
    const locker = await getLockerById(lockerId);
    if (locker) {
      return successResponse(res, locker);
    } else {
      return errorResponse(res, 'Locker not found', 404);
    }
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to get locker', 500, [error.message]);
  }
};

const getAll = async (req, res) => {
    try {
      const lockers = await getAllLockers();
      return successResponse(res, lockers);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 'Failed to get lockers', 500, [error.message]);
    }
  };

const createNewLocker = async (req, res) => {
  try {
    const { locker_number } = req.body;
    const newLocker = await createLocker(locker_number);
    return successResponse(res, newLocker, 'Locker created successfully', 201);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to create locker', 500, [error.message]);
  }
};

const updateExistingLocker = async (req, res) => {
  try {
    const lockerId = req.params.lockerId;
    const updatedLocker = req.body;
    const locker = await updateLocker(lockerId, updatedLocker);
    return successResponse(res, locker, 'Locker updated successfully');
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to update locker', 500, [error.message]);
  }
};

const deleteExistingLocker = async (req, res) => {
  try {
    const lockerId = req.params.lockerId;
    await deleteLocker(lockerId);
    return successResponse(res, null, 'Locker deleted successfully', 204);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to delete locker', 500, [error.message]);
  }
};

const assignExistingLocker = async (req, res) => {
  try {
    const lockerId = req.params.lockerId;
    const { facial_embedding } = req.body;
    const assignment = await assignLocker(lockerId, facial_embedding);
    return successResponse(res, assignment, 'Locker assigned successfully', 201);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to assign locker', 500, [error.message]);
  }
};

const unassignExistingLocker = async (req, res) => {
  try {
    const lockerId = req.params.lockerId;
    await unassignLocker(lockerId);
    return successResponse(res, null, 'Locker unassigned successfully', 204);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Failed to unassign locker', 500, [error.message]);
  }
};

export { initDB, getLocker, getAll, createNewLocker, updateExistingLocker, deleteExistingLocker, assignExistingLocker, unassignExistingLocker };