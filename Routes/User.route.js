const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/User.controller");
const MessageController = require("../Controllers/Message.controller");

//User for Login
router.post("/login", UserController.login);

//AUTHORIZING THE USER THROUGH THE TOKEN SENT
router.get("/user", UserController.verifyToken, UserController.getUser);

//User Logot
router.get("/logout", UserController.verifyToken, UserController.logout);

//Fetch Projects
router.get("/messages", MessageController.getMessages);
//Post Messages
router.post("/messages", MessageController.postMessages);
module.exports = router;
