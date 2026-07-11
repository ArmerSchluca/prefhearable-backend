const db = require("../config/db");

async function create(id) {
  await db.query(`INSERT INTO participants (id) VALUES (?)`, [id]);
}

async function findById(id) {
  const rows = await db.query(`SELECT * FROM participants WHERE id = ?`, [
    id,
  ]);

  return rows[0] || null;
}

module.exports = {
  create,
  findById,
};
