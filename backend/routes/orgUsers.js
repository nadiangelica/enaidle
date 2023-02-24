const express = require("express");
const router = express.Router();
const {loginOrgUser, createOrgUser} = require("../controllers/orgUsersController");

router.post("/login", loginOrgUser);
router.post("/signup", createOrgUser);

module.exports = router;