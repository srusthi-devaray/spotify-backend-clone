const express = require("express");
const router = express.Router();
const authcontrole = require("../controlers/auth.controlers");

//register api

router.post("/register", authcontrole.registeruser);
router.post("/login", authcontrole.loginuser);
router.post("/logout", authcontrole.logoutuser);
router.get("/me", authcontrole.currentuser);
module.exports = router;
