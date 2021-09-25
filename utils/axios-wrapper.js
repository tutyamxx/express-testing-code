const axios = require("axios").default;

const fetchFromAPI = async (url) => {
    if (!url || typeof url !== "string" || !url.length) throw "Invalid url parameter! Must be a string";

    let resultData = [];

    try {
        resultData = await axios.get(url).then((response) => response?.data || []);
    }

    catch (error) {
        console.log(error.message);
    }

    return resultData;
};

module.exports.fetchFromAPI = fetchFromAPI;