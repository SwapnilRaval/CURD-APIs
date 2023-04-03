"use strict";
const router = require("express").Router();
const emp = require("../controllers/emp.controller");
const auth = require("../middleware/auth")

router.get("/", emp.get_data);
router.get("/data/:phoneno", emp.getdataPhoneumber);
router.get('/alldata',emp.get_alldata);
router.post("/setdata",  emp.set_alldata);
router.post("/emp", emp.set_empdata);
router.post("/cmp",emp.set_cmpdata);
router.delete("/delete/:name", emp.delete_emp);


module.exports = router;