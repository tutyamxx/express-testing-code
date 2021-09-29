const express = require("express");
const router = express.Router();

// --| Routing for GET endpoints
router.get("/", require("./index.js").router);
router.get("/hello-world", require("./helloworld.js").router);
router.get("/wind-forecast/:postcode?", require("./windforecast.js").router);

module.exports.router = router;
