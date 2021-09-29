const router = require("express").Router();
const apiStatus = require("../../utils/status.json");

// --| Home index /
router.get("/", (req, res, next) => res.status(apiStatus.ok).json({ status: apiStatus.ok, message: "It works, home page!" }));

module.exports = router;
