const participantRepo = require("../repositories/participant.repository");

/**
 * Middleware: Resolves a participant from the X-Participant-Id header.
 *
 * This middleware:
 * - extracts the participant UUID from request headers
 * - validates that it exists
 * - checks existence in the database
 * - attaches the full participant object to `req.participant`
 *
 * Used as a lightweight authentication/identification mechanism
 * for pseudonymous survey participation.
 *
 * @header X-Participant-Id - UUID identifying the participant
 * @sets req.participant - full participant DB object
 * @auth pseudonymous (no password-based authentication)
 */
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
