const surveyRepo = require("../repositories/survey.repository");
const personalRepo = require("../repositories/personalData.repository");
const contextRepo = require("../repositories/contextData.repository");

/**
 * Get all surveys for the currently resolved participant.
 * 
 * Expects `req.participant` to be set by authentication/resolve middleware.
 * Returns all surveys belonging to this participant.
 *
 * @route GET /surveys
 * @auth required (X-Participant-Id header via middleware)
 */
async function getAllSurveys(req, res) {
  try {
    const participant = req.participant;
    const surveys = await surveyRepo.findByParticipantId(participant.id);
    res.json(surveys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch surveys" });
  }
}

/**
 * Stores personal survey data for a given survey.
 *
 * Expects:
 * - surveyId in route params
 * - validated payload in req.body
 *
 * Data is persisted in the personal_data table (1:1 with survey).
 *
 * @route POST /surveys/:surveyId/personal
 * @auth required (X-Participant-Id header via middleware)
 */
async function submitPersonal(req, res) {
  try {
    const { surveyId } = req.params;
    await personalRepo.savePersonalData(surveyId, req.body);
    res.json({ message: "Personal data saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving personal data" });
  }
}

/**
 * Stores contextual/environmental data for a given survey.
 *
 * Includes geolocation, environment, time-based and weather-related data.
 *
 * Expects:
 * - surveyId in route params
 * - validated payload in req.body
 *
 * Data is persisted in the contextual_data table (1:1 with survey).
 *
 * @route POST /surveys/:surveyId/context
 * @auth required (X-Participant-Id header via middleware)
 */
async function submitContext(req, res) {
  try {
    const { surveyId } = req.params;
    await contextRepo.saveContextData(surveyId, req.body);
    res.json({ message: "Context data saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving context data" });
  }
}

module.exports = {
  getAllSurveys,
  submitPersonal,
  submitContext
};