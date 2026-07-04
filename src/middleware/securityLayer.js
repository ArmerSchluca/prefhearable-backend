const participantRepo = require("../repositories/participant.repository");

async function resolveParticipant(req, res, next) {
  // UUID über Header schicken statt URL. Verhindert: sichtbar, teilbar, speicherbar, loggbar
  const id = req.header("X-Participant-Id");

  if (!id) {
    return res.status(401).json({ message: "Missing participant id" });
  }

  const participant = await participantRepo.findById(id);

  if (!participant) {
    return res.status(404).json({ message: "Unknown participant" });
  }

  // WICHTIG: nicht nur ID speichern
  req.participant = participant;

  next();
}

module.exports = {
  resolveParticipant,
};
