require("dotenv").config();

const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  dateStrings: true, // Damit die Zeitzone nicht UTC ist
});

async function establishConnection() {
  try {
    const conn = await pool.getConnection();

    const result = await conn.query("SELECT 1 AS ok");

    console.log("DB connected:", result);

    conn.release();
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

module.exports = pool;
module.exports.establishConnection = establishConnection;
