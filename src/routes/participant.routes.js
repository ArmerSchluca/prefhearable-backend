const express = require("express");
const router = express.Router();
const controller = require("../controllers/participant.controller");

/**
 * @openapi
 * /participants:
 *   post:
 *     summary: Create a new participant
 *     description: Creates a pseudonymous participant and returns a UUID.
 *     responses:
 *       201:
 *         description: Participant created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 participantId:
 *                   type: string
 */
router.post("/", controller.createParticipant);

module.exports = router;
