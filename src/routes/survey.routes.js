const express = require("express");
const router = express.Router();
const { resolveParticipant } = require("../middleware/securityLayer");
const controller = require("../controllers/survey.controller");

/**
 * @swagger
 * /surveys:
 *   post:
 *     summary: Submit a completed survey
 *     tags:
 *       - Surveys
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
 *             type: object
 *     responses:
 *       201:
 *         description: Survey successfully stored.
 */
router.post("/", resolveParticipant, controller.submitSurvey);

/**
 * @swagger
 * /surveys:
 *   get:
 *     summary: Get previous surveys
 *     tags:
 *       - Surveys
 *     parameters:
 *       - in: header
 *         name: X-Participant-Id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of completed surveys.
 */
router.get("/", resolveParticipant, controller.getSurveys);
module.exports = router;
