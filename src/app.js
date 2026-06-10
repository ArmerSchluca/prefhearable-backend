const db = require("./db/db");

const express = require("express");
const app = express();
const port = 3000;

async function start() {
  try {
    await db.testConnection();

    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
    
    app.get("/", (req, res) => {
      res.send(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Server not started because DB is down");
    process.exit(1);
  }
}

start();
