const express = require("express");
const router = express.Router();
const controller = require("../controllers/participant.controller");

router.post("/", controller.createParticipant);

module.exports = router;
