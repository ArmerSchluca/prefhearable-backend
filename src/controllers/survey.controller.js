const surveyRepo = require("../repositories/survey.repository");

async function submitSurvey(req, res) {
  try {
    const participantId = req.participant.id;
    // Request in der Konsole anzeigen 
    console.dir(req.body, { depth: null });
    const surveyId = await surveyRepo.submit(participantId, req.body);

    res.status(201).json({
      surveyId: Number(surveyId),
      message: "Survey successfully persisted.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to persist survey.",
    });
  }
}

async function getSurveys(req, res) {
  try {
    const participantId = req.participant.id;
    const surveys = await surveyRepo.getSurveys(participantId);
    res.status(200).json(surveys);

    // Response in der Konsole anzeigen
    console.dir(surveys, { depth: null });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load surveys.",
    });
  }
}

module.exports = {
  submitSurvey,
  getSurveys,
};
