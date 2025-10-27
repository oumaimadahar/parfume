const express = require("express");
const router = express.Router();
const { createMessage, getMessages,deleteMessage } = require("../controllers/contactController");

// POST message
router.post("/contact", createMessage);

// GET tous les messages
router.get("/contact", getMessages);
// DELETE message par ID
router.delete("/contact/:id", deleteMessage);

module.exports = router;
