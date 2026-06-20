const db = require("../config/db");

async function findByParticipantId(participantId) {
  return db.query(
    "SELECT * FROM surveys WHERE participant_id = ?",
    [participantId]
  );
}

module.exports = {
  findByParticipantId
};