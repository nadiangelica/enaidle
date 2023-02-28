const express = require("express");
const router = express.Router();
const { loginIndUser, createIndUser, findIndUserById } = require("../controllers/indUsersController");

router.post("/login", loginIndUser);
router.post("/signup", createIndUser);
router.get("/:ind_user_id", findIndUserById);

module.exports = router;