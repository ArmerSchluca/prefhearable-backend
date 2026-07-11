const surveyRepo = require("../repositories/survey.repository");

async function submitSurvey(req, res) {
  try {
    const participantId = req.participant.id;
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

module.exports = {
  submitSurvey,
};
