const express = require("express");
const router = express.Router();
const {loginOrgUser, createOrgUser, findOrgUserById, getAllOrgNames, updateOrgInfo} = require("../controllers/orgUsersController");

router.post("/login", loginOrgUser);
router.post("/signup", createOrgUser);
router.get("/:org_user_id", findOrgUserById);
router.get("/", getAllOrgNames);
router.post("/update-info", updateOrgInfo);

module.exports = router;