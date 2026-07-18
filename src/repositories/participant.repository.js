const db = require("../config/db");

async function create(id) {
  await db.query(`INSERT INTO participants (id) VALUES (?)`, [id]);
}

async function findById(id) {
  const rows = await db.query(`SELECT * FROM participants WHERE id = ?`, [id]);

  return rows[0] || null;
}

async function updatePersonalData(participantId, personalData) {
  await db.query(
    `
    UPDATE participants
    SET
      age = ?,
      gender = ?,
      occupation = ?,
      hearing_aid = ?,
      hearing_aid_duration = ?,
      hearing_aid_type = ?,
      residential_area = ?,
      physical_activity_type = ?,
      physical_activity_frequency = ?,
      physical_activity_duration = ?,
      diet = ?,
      allergies = ?,
      diseases = ?
    WHERE id = ?
    `,
    [
      personalData.age,
      personalData.gender,
      personalData.occupation,
      personalData.hearingAided,
      personalData.hearingAidDuration,
      personalData.hearingAidType,
      personalData.residentialArea,
      personalData.physicalActivityType,
      personalData.physicalActivityFrequency,
      personalData.physicalActivityDuration,
      personalData.diet,
      personalData.allergies,
      personalData.diseases,
      participantId,
    ],
  );
}

module.exports = {
  create,
  findById,
  updatePersonalData,
};
