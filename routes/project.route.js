"use strict";
const router = require("express").Router();
const project = require("../controllers/project.controller");
const auth = require("../middleware/auth");

router.get("/get", project.project);
router.get("/get-projects", project.getProject);
router.get("/project/:id", auth, project.getProjectsById);
router.post("/add-project", auth, project.addProjects);
router.post("/update-data", auth, project.updateData);
router.delete("/:id", auth, project.deleteProject);

module.exports = router;