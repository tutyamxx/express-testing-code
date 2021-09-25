const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

// --| Import our status codes from a JSON file
const apiStatus = require("./utils/status.json");
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// --| Enable CORS for all requests at the moment
app.use(cors());

// --| Enable Helmet to secure the API a bit for exploits
app.use(helmet());

// --| Version 1 of API in /api/ folder /v1/
// --| This way we can maintain the API in the future with other beta versions on /v2/ ?
const apiRoutes = require("./routes/v1/routes");
app.use("/api/v1", apiRoutes.router);

// --| 404 Response
app.use((req, res, next) => res.status(apiStatus.not_found).json({ status: apiStatus.not_found, message: "Sorry, can't access the endpoint you are looking for" }));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || apiStatus.internal_server_error);
});

module.exports = app;
