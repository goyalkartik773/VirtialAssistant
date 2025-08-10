const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const upload = require("../middlewares/multer");
const { userAuth, updateAssistant,askToAssistant } = require("../controllers/userAuth");

// Routes
router.get("/current", isAuth, userAuth);
router.post("/update", isAuth, upload.single("AssistantImage"), updateAssistant);
router.post("/asktoassistant",isAuth,askToAssistant);

module.exports = router;
