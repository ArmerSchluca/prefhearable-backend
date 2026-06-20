const express = require("express");
const router = express.Router();
const { resolveParticipant } = require("../middleware/securityLayer");
const controller = require("../controllers/survey.controller");

router.get("/surveys", resolveParticipant, controller.getAllSurveys);

router.post("/:surveyId/personal", controller.submitPersonal);
router.post("/:surveyId/context", controller.submitContext);

module.exports = router;
