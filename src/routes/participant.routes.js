const express = require("express");
const router = express.Router();
const { resolveParticipant } = require("../middleware/securityLayer");
const controller = require("../controllers/participant.controller");

router.post("/", controller.createParticipant);

router.get("/me", resolveParticipant, controller.getParticipant);

module.exports = router;
