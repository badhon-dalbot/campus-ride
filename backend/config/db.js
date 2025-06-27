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
  database: "campus_ride",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection on startup
db.getConnection()
  .then((conn) => {
    console.log("===============================================");
    console.log("        Connected to MySQL database!");
    console.log("===============================================");
    conn.release();
  })
  .catch((err) => {
    console.error("MySQL connection failed:", err.message);
    process.exit(1); // Exit if DB connection fails
  });

export default db;
