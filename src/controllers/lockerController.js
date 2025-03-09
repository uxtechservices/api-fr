import { initializeDatabase, getLockerById, getAllLockers, createLocker, updateLocker, deleteLocker, assignLocker, unassignLocker } from '../models/lockerModel.js';

const initDB = async (req, res) => {
    try {
        await initializeDatabase();
        res.status(201).json({ message: "Database and tables created"});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Failed to initialize DB"});
    }
};

const getLocker = async (req, res) => {
  try {
    const lockerId = req.params.lockerId;
    const locker = await getLockerById(lockerId);
    if (locker) {
      res.json(locker);
    } else {
      res.status(404).json({ message: 'Locker not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get locker' });
  }
};

const getAll = async (req, res) => {
    try {
      const lockers = await getAllLockers();
      res.json(lockers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get lockers' });
    }
  };

const createNewLocker = async (req, res) => {
  try {
    const { locker_number } = req.body;
    const newLocker = await createLocker(locker_number);
    res.status(201).json(newLocker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create locker' });
  }
};

const updateExistingLocker = async (req, res) => {
  try {
    const lockerId = req.params.lockerId;
    const updatedLocker = req.body;
    const locker = await updateLocker(lockerId, updatedLocker);
    res.json(locker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update locker' });
  }
};

const deleteExistingLocker = async (req, res) => {
  try {
    const lockerId = req.params.lockerId;
    await deleteLocker(lockerId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete locker' });
  }
};

const assignExistingLocker = async (req, res) => {
  try {
    const lockerId = req.params.lockerId;
    const { facial_embedding } = req.body;
    const assignment = await assignLocker(lockerId, facial_embedding);
    res.status(201).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to assign locker' });
  }
};

const unassignExistingLocker = async (req, res) => {
  try {
    const lockerId = req.params.lockerId;
    await unassignLocker(lockerId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to unassign locker' });
  }
};

export { initDB, getLocker, getAll, createNewLocker, updateExistingLocker, deleteExistingLocker, assignExistingLocker, unassignExistingLocker };
