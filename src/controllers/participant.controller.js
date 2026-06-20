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

module.exports = {
  createParticipant,
};
