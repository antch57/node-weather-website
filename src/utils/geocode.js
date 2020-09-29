const request = require('postman-request');

// GOAL: Use both destructuring and property shorthand in weather app
// 
// 1. Use destructuring in app.js, forecase.js, and geocode.js
// 2. Use property shorthand in forecase.js and geocode.js
// 3. Test your work and ensure app still works.


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1IjoiYW50NTciLCJhIjoiY2tmaDJnOGtuMGRtcDJ2cDF1eTNienc2MiJ9.55rFIs0netRmHBGqtVyRIg&limit=1`;

    request({url, json: true}, (err, {body}) => {
        if(err) {
            callback('Unable to connect to location services.', undefined);
        } else if(body.features.length === 0){
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        };
    });
};

module.exports = geocode