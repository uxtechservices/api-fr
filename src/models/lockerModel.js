import pool from '../config/database.js';

const createDatabase = async () => {
    try {
      const connection = await pool.getConnection();
      await connection.query('CREATE DATABASE IF NOT EXISTS bamp1asmfigbudn1ho3t;');
      console.log('Database created or already exists.');
      connection.release();
    } catch (error) {
      console.error('Error creating database:', error);
      throw error;
    }
  };
  
  const createTables = async () => {
    try {
      const connection = await pool.getConnection();

      await connection.query(`
      CREATE TABLE IF NOT EXISTS lockers (
          locker_id INT AUTO_INCREMENT PRIMARY KEY,
          locker_number INT UNIQUE NOT NULL,
          is_available BOOLEAN DEFAULT TRUE,
          locker_status ENUM('open', 'closed') DEFAULT 'closed',
          emergency_override BOOLEAN DEFAULT FALSE
      );
      `);

      await connection.query(`
      CREATE TABLE IF NOT EXISTS locker_assignments (
          assignment_id INT AUTO_INCREMENT PRIMARY KEY,
          locker_id INT NOT NULL,
          facial_embedding TEXT NOT NULL,
          assignment_start DATETIME DEFAULT CURRENT_TIMESTAMP,
          assignment_end DATETIME NULL,
          FOREIGN KEY (locker_id) REFERENCES lockers(locker_id),
          UNIQUE KEY (locker_id)
      );
      `);
      console.log('Tables created or already exist.');
      connection.release();
    } catch (error) {
      console.error('Error creating tables:', error);
      throw error;
    }
  };
  
  const initializeDatabase = async () => {
    try {
        await createDatabase();
        await createTables();
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  };

  const getLockerById = async (lockerId) => {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM lockers WHERE locker_id = ?', [lockerId]);
      connection.release();
      return rows[0];
    } catch (error) {
      console.error('Error getting locker by ID:', error);
      throw error;
    }
  };

  const getAllLockers = async () => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM lockers');
        connection.release();
        return rows;
      } catch (error) {
        console.error('Error getting all lockers:', error);
        throw error;
      }
  };

    const createLocker = async (lockerNumber) => {
      try {
        const connection = await pool.getConnection();
        console.log(`Model - createLocker - Creando locker con locker_number: ${lockerNumber}`); // Log
        const [result] = await connection.query('INSERT INTO lockers (locker_number) VALUES (?)', [lockerNumber]);
        console.log(`Model - createLocker - Resultado de la query:`, result); // Log
        connection.release();
    
        const newLocker = { locker_id: result.insertId, locker_number: lockerNumber }; // Corregido
        console.log(`Model - createLocker - Retornando:`, newLocker); // Log
        return newLocker;
      } catch (error) {
        console.error('Model - createLocker - Error:', error); // Imprime el error completo
        throw error; // Lanza el error para que el controlador lo capture
      }
    };

  const updateLocker = async (lockerId, updatedLocker) => {
    try {
      const connection = await pool.getConnection();
      const { locker_number, is_available, locker_status, emergency_override } = updatedLocker;
      await connection.query(
        'UPDATE lockers SET locker_number = ?, is_available = ?, locker_status = ?, emergency_override = ? WHERE locker_id = ?',
        [locker_number, is_available, locker_status, emergency_override, lockerId]
      );
      connection.release();
      return { locker_id: lockerId, ...updatedLocker };
    } catch (error) {
      console.error('Error updating locker:', error);
      throw error;
    }
  };

  const deleteLocker = async (lockerId) => {
    try {
      const connection = await pool.getConnection();
      await connection.query('DELETE FROM lockers WHERE locker_id = ?', [lockerId]);
      connection.release();
    } catch (error) {
      console.error('Error deleting locker:', error);
      throw error;
    }
  };

  const assignLocker = async (lockerId, facialEmbedding) => {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        'INSERT INTO locker_assignments (locker_id, facial_embedding) VALUES (?, ?)',
        [lockerId, facialEmbedding]
      );
      connection.release();
      return { assignment_id: result.insertId, locker_id: lockerId, facial_embedding: facialEmbedding };
    } catch (error) {
      console.error('Error assigning locker:', error);
      throw error;
    }
  };

  const unassignLocker = async (lockerId) => {
    try {
      const connection = await pool.getConnection();
      await connection.query('UPDATE locker_assignments SET assignment_end = CURRENT_TIMESTAMP WHERE locker_id = ? AND assignment_end IS NULL', [lockerId]);
      await connection.query('UPDATE lockers SET is_available = TRUE WHERE locker_id = ?', [lockerId]);
      connection.release();
    } catch (error) {
      console.error('Error unassigning locker:', error);
      throw error;
    }
  };

export { initializeDatabase, getLockerById, getAllLockers, createLocker, updateLocker, deleteLocker, assignLocker, unassignLocker };
