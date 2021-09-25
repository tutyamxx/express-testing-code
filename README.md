# Unit testing sample log after fix

<p align="center">
  <img src="https://raw.githubusercontent.com/tutyamxx/express-testing-code/main/logs.png" />
 </p>


**Brief: Tackle each of the four tasksbelow. There is a time limit of 30 mins. You are not expected to be able to complete the entire exercise. The produced code does not need to be production-ready but should be in a state that you would be prepared to present and demonstrate to colleagues.**

  Localhost URL: [http://localhost:3000/](http://localhost:3000/)

- Successful build & run app
- The page at  [/hello-world'](http://localhost:3000/hello-world) is returning a 404. Resolve the bug.
- Build an API to return forecasted wind speed and direction for the date in three days time based upon an inputted postcode
  - Query [https://postcodes.io/](https://postcodes.io/) with the inputted postcode to return the location's lat/long
    - API call - https://api.postcodes.io/postcodes/{POSTCODE}
  - Query MetaWeather Location Search [https://www.metaweather.com/api/#locationsearch](https://www.metaweather.com/api/#locationsearch) with lat/long from above to return Where On Earth ID (woeid)
    - API call - https://www.metaweather.com/api/location/search/?lattlong={LATTITUDE},{LONGTITUDE}
  - Query MetaWeather Location [https://www.metaweather.com/api/#location](https://www.metaweather.com/api/#location) with Where On Earth ID (woeid), filter results by applicable_date for the date in three days time and return wind_speed and wind_direction in a JSON object
    - API call - https://www.metaweather.com/api/location/{WOEID}/
  - Write unit tests for the above
