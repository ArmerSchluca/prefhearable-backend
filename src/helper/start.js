const db = require("../db/db");

const port = 3000;

async function start(app) {
  try {
    await db.establishConnection();

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

module.exports = { start }