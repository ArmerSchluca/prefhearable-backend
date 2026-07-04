const surveyRepo = require("../repositories/survey.repository");
const personalRepo = require("../repositories/personalData.repository");
const contextRepo = require("../repositories/contextData.repository");

async function createSurvey(req, res) {
  try {
    const survey = await surveyRepo.create(req.participant.id);
    res.status(201).json(survey);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating survey",
    });
  }
}

module.exports = {
  createSurvey,
};
