const express = require("express");
const router = express.Router();
const apiStatus = require("../../utils/status.json");

// --| Hello  world page no 404, fix
router.get("/hello-world", (req, res, next) => res.json({ status: apiStatus.ok, message: "It works, Hello World" }))

module.exports.router = router;