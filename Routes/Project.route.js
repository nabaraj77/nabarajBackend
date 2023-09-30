const express = require("express");
const router = express.Router();
const ProjectController = require("../Controllers/Projects.controller");

//Fetch Projects
router.get("/projects", ProjectController.getProjects);
//Post Messages
router.post("/projects", ProjectController.postProjects);

//Post Messages
router.delete("/projects/:id", ProjectController.deleteProjects);
//Post Messages
router.patch("/projects/:id", ProjectController.updateProject);
module.exports = router;
