const axios = require("axios").default;

const fetchFromAPI = async (url) => {
    if (!url || typeof url !== "string" || !url.length) throw "Invalid url parameter! Must be a string";
    if (!isValidURL(url)) throw "Invalid url parameter! Must be an actual valid url!";

    let resultData = [];

    try {
        resultData = await axios.get(url).then((response) => response?.data || []);
    }

    catch (error) {
        console.log(error.message);
    }

    return resultData;
};

const isValidURL = (string) => {
    const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return !!res;
};

module.exports.fetchFromAPI = fetchFromAPI;
