const express = require("express");
const router = express.Router();
const Log = require("../models/log");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/logs", authenticateToken, async (req, res) => {
  const logs = await Log.findAll();
  res.json(logs);
});

module.exports = router;
