const { v4: uuidv4 } = require("uuid");
const participantRepo = require("../repositories/participant.repository");

/**
 * Creates a new participant and returns a UUID-based identifier.
 *
 * The UUID acts as both:
 * - a pseudonymous identifier
 * - a bearer token for subsequent requests (via X-Participant-Id header)
 *
 * No authentication or account creation is required.
 *
 * @route POST /participants
 * @returns {Object} participantId - UUID used for all future requests
 */
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

/**
 * Returns the currently authenticated participant.
 *
 * Expects req.participant to be populated by resolveParticipant middleware.
 *
 * @route GET /participants/me
 * @auth required (X-Participant-Id header)
 */
async function getParticipant(req, res) {
  res.json(req.participant);
}

module.exports = {
  createParticipant,
  getParticipant,
};
