const db = require("../config/db");

async function saveContextData(surveyId, data) {
  await db.query(
    `INSERT INTO context_data
     (survey_id, latitude, longitude, location_type,
      climate_zone, season, noise_level, time_of_day, weather)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      surveyId,
      data.latitude,
      data.longitude,
      data.location_type,
      data.climate_zone,
      data.season,
      data.noise_level,
      data.time_of_day,
      data.weather,
    ],
  );
}

module.exports = { saveContextData };
