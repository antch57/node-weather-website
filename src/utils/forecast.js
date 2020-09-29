const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=32d5af8bf2bbd83ed74f7267110b2adf&query=${long},${lat}&units=f`;

    request({url, json: true}, (err, {body}) => {
    if (err) {
        callback('Unable to connect to Weather Service',undefined);
     } else if (body.error) {
         callback('Unable to find location.',undefined);
     } else {
         callback(undefined,`Today it is ${body.current.weather_descriptions[0]}.\nIt is currently ${body.current.temperature} degrees out.\nIt feels like ${body.current.feelslike} degrees. The humidity is ${body.current.humidity}%`);
        };
    });
};

module.exports = forecast;