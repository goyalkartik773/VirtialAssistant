const express = require("express");
const router = express.Router(); 

const { signUp, login, logOut } = require("../controllers/auth");

// Routes
router.post("/signup", signUp);
router.post("/signin", login);
router.get("/logout", logOut);

module.exports = router;
