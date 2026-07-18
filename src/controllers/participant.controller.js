const { v4: uuidv4 } = require("uuid");
const participantRepo = require("../repositories/participant.repository");

async function createParticipant(req, res) {
  try {
    // UUID dient als Identifikator und als Zugriffstoken
    const id = uuidv4();

    await participantRepo.create(id);

    res.status(201).json({
      participantId: id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating participant" });
  }
}

async function getParticipant(req, res) {
  res.json(req.participant);
}

async function updatePersonalData(req, res) {
  try {
    const participantId = req.participant.id;

    await participantRepo.updatePersonalData(participantId, req.body);

    res.status(204).send();
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update personal data.",
    });
  }
}

module.exports = {
  createParticipant,
  getParticipant,
  updatePersonalData,
};
