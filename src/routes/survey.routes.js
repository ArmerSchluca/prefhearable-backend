const express = require("express");
const router = express.Router();
const { resolveParticipant } = require("../middleware/securityLayer");
const controller = require("../controllers/survey.controller");

/**
 * @openapi
 * /surveys:
 *   get:
 *     summary: Get all surveys for participant
 *     security:
 *       - participantHeader: []
 *     responses:
 *       200:
 *         description: List of surveys
 */
router.get("/surveys", resolveParticipant, controller.getAllSurveys);

/**
 * @openapi
 * /surveys/{surveyId}/personal:
 *   post:
 *     summary: Submit personal data
 *     parameters:
 *       - in: path
 *         name: surveyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Personal data saved
 */
router.post("/:surveyId/personal", controller.submitPersonal);

/**
 * @openapi
 * /surveys/{surveyId}/context:
 *   post:
 *     summary: Submit contextual data
 *     parameters:
 *       - in: path
 *         name: surveyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Context data saved
 */
router.post("/:surveyId/context", controller.submitContext);

module.exports = router;
