const db = require("../config/db");

async function create(id) {
  await db.query("INSERT INTO participants (id) VALUES (?)", [id]);
}

async function deleteSurvey(req, res) {
  const { surveyId } = req.params;
  const participantId = req.participantId;

  const result = await db.query(
    `DELETE FROM surveys
     WHERE id = ?
     AND participant_id = ?`,
    [surveyId, participantId],
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({ message: "deleted" });
}

module.exports = {
  create,
};
