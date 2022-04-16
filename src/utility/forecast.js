const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=0535add3665ea3f15585016215e52d9d&query=" +
    longitude +
    "," +
    latitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to Connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        "The current temperature is " +
          body.current.temperature +
          "°C And humidity is: " +
          body.current.humidity +
          ". The Current feel is " +
          body.current.feelslike +
          "°C. Weather discription: " +
          body.current.weather_descriptions[0]
      );
    }
  });
};

module.exports = forecast;
