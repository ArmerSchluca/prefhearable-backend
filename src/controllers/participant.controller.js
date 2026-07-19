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
  console.dir(req.participant, { depth: null });
  res.json(req.participant);
}

async function getPersonalData(req, res) {
  res.json(req.participant.personalData);
  // Request in der Konsole anzeigen
  console.dir(req.body, { depth: null });
}

async function updatePersonalData(req, res) {
  try {
    const participantId = req.participant.id;

    await participantRepo.updatePersonalData(participantId, req.body);
    // Request in der Konsole anzeigen
    console.dir(req.body, { depth: null });
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
  getPersonalData,
  updatePersonalData,
};
