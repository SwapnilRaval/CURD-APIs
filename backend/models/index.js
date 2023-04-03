const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.emp = require("./emp.model")(mongoose);
db.cmp_details = require("./cmp_details.model")(mongoose);
db.project = require("./project.model");
db.user = require("./user.model");
db.contact = require("./contact.model");
db.image = require("./image.model");

module.exports = db;
