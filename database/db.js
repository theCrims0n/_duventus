import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
const pool = mysql.createPool({
    host: {/*'your-host'*/},
    user: {/*'user'*/},
    password: {/*'your-password'*/},
    database: {/*'duyour-database'*/},
    port: {/*'your-port'*/}
}).promise()
export default pool;