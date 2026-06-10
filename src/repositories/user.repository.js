const db = require("../db/db");

async function createUser(user) {
  const sql = `
    INSERT INTO users (age, gender, diseases)
    VALUES (?, ?, ?)
  `;

  return db.query(sql, [
    user.age,
    user.gender,
    user.diseases
  ]);
}

async function getUser(id) {
  const sql = `
    SELECT id, age, gender, diseases
    FROM users
    WHERE id = ?
  `;

  const rows = await db.query(sql, [id]);
  return rows[0];
}

async function updateUser(id, user) {
  const sql = `
    UPDATE users
    SET age = ?, gender = ?, diseases = ?
    WHERE id = ?
  `;

  const result = await db.query(sql, [
    user.age,
    user.gender,
    user.diseases,
    id
  ]);

  return result.affectedRows;
}

async function deleteUser(id) {
  const result = await db.query(
    `DELETE FROM users WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser
};