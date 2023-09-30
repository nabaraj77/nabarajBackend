const express = require("express");
const router = express.Router();

const MessageController = require("../Controllers/Message.controller");

//Fetch Projects
router.get("/messages", MessageController.getMessages);
//Post Messages
router.post("/messages", MessageController.postMessages);

//NODEMAILER
module.exports = router;
