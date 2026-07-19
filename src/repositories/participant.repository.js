const db = require("../config/db");

async function create(id) {
  await db.query(`INSERT INTO participants (id) VALUES (?)`, [id]);
}

async function findById(id) {
  const rows = await db.query(`SELECT * FROM participants WHERE id = ?`, [id]);

  if (rows.length === 0) {
    return null;
  }

  const row = rows[0];

  return {
    id: row.id,
    personalData: {
      age: row.age,
      gender: row.gender,
      occupation: row.occupation,
      hearingAided: row.hearing_aid,
      hearingAidDuration: row.hearing_aid_duration,
      hearingAidType: row.hearing_aid_type,
      hearingImpairment: row.hearing_impairment,
      residentialArea: row.residential_area,
      physicalActivityType: row.physical_activity_type,
      physicalActivityIntensity: row.physical_activity_intensity,
      physicalActivityFrequency: row.physical_activity_frequency,
      physicalActivityDuration: row.physical_activity_duration,
      diet: row.diet,
      allergies: row.allergies,
      diseases: row.diseases,
    },
  };
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
      hearing_impairment = ?,
      residential_area = ?,
      physical_activity_type = ?,
      physical_activity_intensity = ?,
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
      personalData.hearingImpairment,
      personalData.residentialArea,
      personalData.physicalActivityType,
      personalData.physicalActivityIntensity,
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
