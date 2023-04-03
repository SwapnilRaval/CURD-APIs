'use strict'
module.exports = (app) => {
  const router = require("express").Router(); 
  const emp = require("../routes/emp.route");
  const project = require("../routes/project.route");
  const user = require("../routes/user.route");
  const contact = require("../routes/contact.route");

  router.use("/emp",emp)
  router.use("/project",project)
  router.use("/user",user)
  router.use("/contact",contact)
  app.use("/", router);
};
