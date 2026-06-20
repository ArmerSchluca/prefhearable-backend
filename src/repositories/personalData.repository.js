const db = require("../config/db");

async function savePersonalData(surveyId, data) {
  await db.query(
    `INSERT INTO personal_data
     (survey_id, age, gender, region, occupation, sport_type,
      sport_frequency, diet, allergies, diseases,
      hearing_aid, hearing_aid_since)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      surveyId,
      data.age,
      data.gender,
      data.region,
      data.occupation,
      data.sport_type,
      data.sport_frequency,
      data.diet,
      data.allergies,
      data.diseases,
      data.hearing_aid,
      data.hearing_aid_since
    ]
  );
}

module.exports = { savePersonalData };