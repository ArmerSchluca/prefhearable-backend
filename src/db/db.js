require("dotenv").config();

const mariadb = require("mariadb");

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DATABASE;

const pool = mariadb.createPool({
  host: host,
  port: port,
  user: user,
  password: password,
  database: database,
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();

    const result = await conn.query("SELECT 1 AS ok");

    console.log("DB connected:", result);

    conn.release();
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

module.exports = { testConnection };
