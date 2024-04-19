import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: "localhost",
  user:
    process.env.APP_MODE === "prod"
      ? process.env.DB_USER_LIVE
      : process.env.DB_USER_DEV,
  password:
    process.env.APP_MODE === "prod"
      ? process.env.DB_USER_PASS_LIVE
      : process.env.DB_USER_PASS_DEV,
  database:
    process.env.APP_MODE === "prod"
      ? process.env.DB_NAME_LIVE
      : process.env.DB_NAME_DEV,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
