const surveyRepo = require("../repositories/survey.repository");
const personalRepo = require("../repositories/personalData.repository");
const contextRepo = require("../repositories/contextData.repository");

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

async function submitPersonal(req, res) {
  try {
    const { surveyId } = req.params;
    await personalRepo.savePersonalData(surveyId, req.body);
    res.json({ message: "Personal data saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving personal data" });
  }
}

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