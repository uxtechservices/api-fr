import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'bamp1asmfigbudn1ho3t-mysql.services.clever-cloud.com',
  user: process.env.DB_USER || 'uxalmi1skg5dihhz',
  password: process.env.DB_PASSWORD || 'EDsZ9kI5O70IuBCRnyyi',
  database: process.env.DB_NAME || 'bamp1asmfigbudn1ho3t',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully!');
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

testConnection(); // Call the function to test the connection

export default pool;