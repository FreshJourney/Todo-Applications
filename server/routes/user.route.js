const express = require("express");
const router = express.Router();
const { Register, Login, Logout } = require("../controller/user.controller");

router.post("/signup", Register);
router.post("/login", Login);
router.get("/logout", Logout);
module.exports = router;
