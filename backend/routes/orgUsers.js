const express = require("express");
const router = express.Router();
const { loginOrgUser, createOrgUser, findOrgUserById } = require("../controllers/orgUsersController");

router.post("/login", loginOrgUser);
router.post("/signup", createOrgUser);
router.get("/:user_id", findOrgUserById);

module.exports = router;
