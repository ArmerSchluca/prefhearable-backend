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

module.exports = {
  createUser
};