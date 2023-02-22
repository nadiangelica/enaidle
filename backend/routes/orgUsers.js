const express = require("express");
const router = express.Router();
const {getAllOrgUsers, createOrgUser} = require("../controllers/orgUsers");

router.get("/", getAllOrgUsers);
router.post("/", createOrgUser);

module.exports = router;