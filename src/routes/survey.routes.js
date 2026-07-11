const express = require("express");
const router = express.Router();
const { resolveParticipant } = require("../middleware/securityLayer");
const controller = require("../controllers/survey.controller");

router.post("/", resolveParticipant, controller.submitSurvey);
router.get("/", resolveParticipant, controller.getSurveys);
module.exports = router;
