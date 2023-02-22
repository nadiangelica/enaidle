const express = require("express");
const router = express.Router();

const OrgUsersController = require("../controllers/orgUsers");

router.post("/", OrgUsersController.Create);
// router.get("/getPoster/:user_id", UsersController.FindUserById);

module.exports = router;