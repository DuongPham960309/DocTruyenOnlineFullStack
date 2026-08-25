import mysql from 'mysql2/promise';
import env from './env.js';

const pool = mysql.createPool({
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  connectionLimit: 10
});

try {
  const connection = await pool.getConnection();
  console.log('\x1b[32m MySQL connection established successfully!\x1b[0m');
  connection.release();
} catch (error: any) {
  console.error('\x1b[31m Error: Failed to connect to MySQL Server! IS YOUR MYSQL SERVICE RUNNING?\x1b[0m');
  console.error(`\x1b[31m Details: ${error.message}\x1b[0m`);
}

export default pool;