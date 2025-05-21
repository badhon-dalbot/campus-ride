import dotenv from "dotenv";
import mysql from "mysql2/promise";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "campusride",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
