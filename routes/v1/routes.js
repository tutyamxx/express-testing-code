const express = require("express");
const router = express.Router();
const apiStatus = require("../../utils/status.json");

// --| Routing for GET endpoints
router.get("/", (req, res, next) => res.status(apiStatus.ok).json({ status: apiStatus.ok, message: "It works, home page!" }));
router.get("/hello-world", require("./helloworld.js").router);
router.get("/wind-forecast/:postcode?", require("./windforecast.js").router);

module.exports.router = router;