const express = require("express");
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
const { findOrgUserById, updateOrgInfo } = require("../controllers/orgUsersController");

router.use(requireAuth);

router.get("/:org_user_id", findOrgUserById);
router.post("/update-info", updateOrgInfo);

module.exports = router;