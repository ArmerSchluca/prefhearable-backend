const db = require("../config/db");

const PersonalData = require("../models/survey_modules/personalData.model");
const ContextData = require("../models/survey_modules/contextData.model");
const QuestionnaireData = require("../models/survey_modules/questionnaireData.model");
const AudioTestData = require("../models/survey_modules/audioTestData.model");
const Survey = require("../models/survey.model");

async function findByParticipantId(participantId) {
  return db.query(`SELECT * FROM surveys WHERE participant_id = ?`, [
    participantId,
  ]);
}

async function getSurveys(participantId) {
  const surveys = await db.query(
    `
    SELECT
      id,
      survey_version AS surveyVersion,
      started_at AS startedAt,
      finished_at AS finishedAt
    FROM surveys
    WHERE participant_id = ?
    ORDER BY finished_at DESC;
    `,
    [participantId],
  );

  return surveys;
}

async function submit(participantId, surveyJson) {
  const survey = Survey.fromJson(surveyJson);

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const surveyId = await createSurvey(connection, participantId, survey);

    await saveDeviceInformation(connection, surveyId, survey.deviceInformation);

    await savePersonalData(connection, surveyId, survey.personalData);

    await saveContextData(connection, surveyId, survey.contextData);

    await saveEq5dResponses(
      connection,
      surveyId,
      survey.questionnaireData.eq5d,
    );

    await saveWho5Responses(
      connection,
      surveyId,
      survey.questionnaireData.who5,
    );

    await saveCcsmResponses(connection, surveyId, survey.audioTestData.ccsm);

    await connection.commit();

    return surveyId;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

async function createSurvey(connection, participantId, survey) {
  const result = await connection.query(
    `
    INSERT INTO surveys
    (
        participant_id,
        survey_version,
        started_at,
        finished_at
    )
    VALUES (?, ?, ?, ?)
    `,
    [participantId, survey.surveyVersion, survey.startedAt, survey.finishedAt],
  );

  return result.insertId;
}

async function saveDeviceInformation(connection, surveyId, device) {
  await connection.query(
    `
    INSERT INTO device_information
    (
      survey_id,
      operating_system,
      model,
      app_version
    )
    VALUES (?, ?, ?, ?)
    `,
    [surveyId, device.operatingSystem, device.model, device.appVersion],
  );
}

async function savePersonalData(connection, surveyId, personal) {
  await connection.query(
    `
    INSERT INTO personal_data
    (
      survey_id,
      age,
      gender,
      occupation,
      hearing_aid,
      hearing_aid_duration,
      hearing_aid_type,
      residential_area,
      physical_activity_type,
      physical_activity_intensity,
      physical_activity_frequency,
      physical_activity_duration,
      diet,
      allergies,
      diseases
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      surveyId,
      personal.age,
      personal.gender,
      personal.occupation,
      personal.hearingAided,
      personal.hearingAidDuration,
      personal.hearingAidType,
      personal.residentialArea,
      personal.physicalActivityType,
      personal.physicalActivityIntensity,
      personal.physicalActivityFrequency,
      personal.physicalActivityDuration,
      personal.diet,
      personal.allergies,
      personal.diseases,
    ],
  );
}

async function saveContextData(connection, surveyId, context) {
  await connection.query(
    `
    INSERT INTO context_data
    (
      survey_id,
      latitude,
      longitude,
      location_type,
      season,
      noise_level,
      timestamp,

      weather_description,
      temperature,
      humidity,
      wind_speed,
      uv_index,

      european_aqi,
      pm25,
      pm10,
      nitrogen_dioxide,
      ozone
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      surveyId,
      context.latitude,
      context.longitude,
      context.locationType,
      context.season,
      context.noiseLevel,
      context.timestamp,

      context.weather.description,
      context.weather.temperature,
      context.weather.humidity,
      context.weather.windSpeed,
      context.weather.uvIndex,

      context.airQuality.europeanAqi,
      context.airQuality.pm25,
      context.airQuality.pm10,
      context.airQuality.nitrogenDioxide,
      context.airQuality.ozone,
    ],
  );
}

async function saveEq5dResponses(connection, surveyId, eq5d) {
  await connection.query(
    `
    INSERT INTO eq5d5l_responses
    (
      survey_id,
      mobility,
      self_care,
      usual_activities,
      pain,
      anxiety
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      surveyId,
      eq5d.mobility,
      eq5d.selfCare,
      eq5d.usualActivities,
      eq5d.pain,
      eq5d.anxiety,
    ],
  );
}

async function saveWho5Responses(connection, surveyId, who5) {
  await connection.query(
    `
    INSERT INTO who5_responses
    (
      survey_id,
      positive_affect,
      calmness,
      vitality,
      restedness,
      life_interest
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      surveyId,
      who5.positiveAffect,
      who5.calmness,
      who5.vitality,
      who5.restedness,
      who5.lifeInterest,
    ],
  );
}

async function saveCcsmResponses(connection, surveyId, ccsm) {
  const responses = [
    {
      identifier: "artificial_sound_1",
      rating: ccsm.artificialSound1,
    },
    {
      identifier: "natural_sound_1",
      rating: ccsm.naturalSound1,
    },
    {
      identifier: "natural_sound_2",
      rating: ccsm.naturalSound2,
    },
  ];

  for (const response of responses) {
    await connection.query(
      `
      INSERT INTO ccsm_audiotest_responses
      (
        survey_id,
        sound_identifier,
        audio_device,
        loudness,
        roughness,
        tonality,
        annoyance,
        sharpness
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        surveyId,
        response.identifier,
        ccsm.audioDevice,
        response.rating.loudness,
        response.rating.roughness,
        response.rating.tonality,
        response.rating.annoyance,
        response.rating.sharpness,
      ],
    );
  }
}

module.exports = { submit, getSurveys };
