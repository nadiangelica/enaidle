const express = require("express");
const router = express.Router();
const {getAllOrgUsers, createOrgUser} = require("../controllers/orgUsersController");

router.get("/", getAllOrgUsers);
router.post("/", createOrgUser);

module.exports = router;