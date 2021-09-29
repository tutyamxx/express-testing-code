const router = require("express").Router();
const apiStatus = require("../../utils/status.json");

// --| Hello  world page no 404, fix
router.get("/", (req, res, next) => res.status(apiStatus.ok).json({ status: apiStatus.ok, message: "It works, Hello World" }))

module.exports = router;