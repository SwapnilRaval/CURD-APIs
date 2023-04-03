"use strict";
const router = require("express").Router();
const contact = require("../controllers/contact.controller");


router.post("/get-contact", contact.searchContact);

module.exports = router;