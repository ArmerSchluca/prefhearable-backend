const express = require("express");
const router = express.Router();
const { resolveParticipant } = require("../middleware/securityLayer");
const controller = require("../controllers/participant.controller");

/**
 * @swagger
 * /participants:
 *   post:
 *     summary: Create a new participant
 *     tags:
 *       - Participants
 *     responses:
 *       201:
 *         description: Participant successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 participantId:
 *                   type: string
 *                   format: uuid
 */
router.post("/", controller.createParticipant);

/**
 * @swagger
 * /participants/me:
 *   get:
 *     summary: Get current participant
 *     tags:
 *       - Participants
 *     parameters:
 *       - in: header
 *         name: X-Participant-Id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Participant found.
 *       404:
 *         description: Participant not found.
 */
router.get("/me", resolveParticipant, controller.getParticipant);

/**
 * @swagger
 * /participants/me/personal-data:
 *   put:
 *     summary: Update personal data of the current participant
 *     tags:
 *       - Participants
 *     parameters:
 *       - in: header
 *         name: X-Participant-Id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonalData'
 *     responses:
 *       204:
 *         description: Personal data updated.
 *       400:
 *         description: Invalid request.
 *       404:
 *         description: Participant not found.
 */
router.put(
  "/me/personal-data",
  resolveParticipant,
  controller.updatePersonalData,
);

module.exports = router;
