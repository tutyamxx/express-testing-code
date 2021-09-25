const express = require("express");
const router = express.Router();

const apiStatus = require("../../utils/status.json");
const { fetchFromAPI } = require("../../utils/axios-wrapper");

// --| Wind forecast
router.get("/wind-forecast/:postcode?", async (req, res, next) => {
    const postCode = req.params.postcode;

    if (!postCode || typeof postCode !== "string" || !postCode.length) return res.status(apiStatus.not_found).json({ status: apiStatus.not_found, message: "Postcode not specified" });

    // --| Define an object that will hold latitude and longitude
    const coordinatesObject = { latitude: null, longitude: null };
    const fetchCoordinates = await fetchFromAPI(`https://api.postcodes.io/postcodes/${postCode.trim()}`);

    // --| Assign the latitude and longitude
    coordinatesObject.latitude = fetchCoordinates?.result?.latitude || null;
    coordinatesObject.longitude = fetchCoordinates?.result?.longitude || null;

    const fetchWoeid = await fetchFromAPI(`https://www.metaweather.com/api/location/search/?lattlong=${coordinatesObject.latitude},${coordinatesObject.longitude}`);
    // --| First item from the response array is the most accurate one for the postcode specified
    const whoeid = fetchWoeid?.[0]?.woeid || null;

    const fetchWindData = await fetchFromAPI(`https://www.metaweather.com/api/location/${whoeid}/`);
    const windData = fetchWindData?.consolidated_weather || [];

    // --| API Response usually is sorted by date today onwards so we can
    // --| Skip today (index 0) from array and get the data for next 3 days
    const dataForNext3Days = windData.slice(1, 4);

    // --| Create an array where we put the following 3 days object with wind speed and direction
    const windsArray = [];

    // --| loop thorough array and set them in an array of objects with properties wind_speed and wind_direction
    dataForNext3Days.forEach((element, i) => windsArray[i] = { wind_speed: element.wind_speed, wind_direction: element.wind_direction });

    return res.status(apiStatus.ok).json({
        status: apiStatus.ok,
        message: windsArray
    });
});

module.exports.router = router;
