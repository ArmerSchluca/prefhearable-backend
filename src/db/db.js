require("dotenv").config();
const db = require("mysql");

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DATABASE;

const connection = db.createConnection({
  host: host,
  port: port,
  user: user,
  password: password,
  database: database,
});

connection.connect();

async function testConnection() {
  try {
    const result = await connection.query("SELECT 1 AS ok");
    console.log("DB connected:", result);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

module.exports = { testConnection };
