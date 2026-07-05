const db = require("../config/db");

async function findByParticipantId(participantId) {
  return db.query(`SELECT * FROM surveys WHERE participant_id = ?`, [
    participantId,
  ]);
}

async function create(participantId) {
  const result = await db.query(
    `INSERT INTO surveys (participant_id) VALUES (?)`,
    [participantId],
  );

  return result.insertId;
}

module.exports = {
  create,
};
