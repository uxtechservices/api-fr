import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'bwsfivbl4xcwgyl4es0c-mysql.services.clever-cloud.com',
  user: process.env.DB_USER || 'usawkbcygcfr3be7',
  password: process.env.DB_PASSWORD || 'kRagKo4lVSNNvdHP55i6',
  database: process.env.DB_NAME || 'bwsfivbl4xcwgyl4es0c',
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
