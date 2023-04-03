"use strict";
const router = require("express").Router();
const project = require("../controllers/project.controller");
const auth = require("../middleware/auth");

router.get("/project/:id", auth, project.getProjectsById);
router.get("/get", project.project);
router.get("/get-projects", project.getProject);
router.post("/add-project", auth, project.addProjects);
router.post("/update-data", auth, project.updateData);
router.delete("/:id", auth, project.deleteProject);

module.exports = router;