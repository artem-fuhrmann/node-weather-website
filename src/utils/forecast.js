const request = require('request');


const forecast = (latitude, longtitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=835e05a862419dfc31f98d37d8c600d5&query=${latitude},${longtitude}`

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, `Forecast: ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees and there is a ${body.current.precip}% chance of rain`)
        }
    })
}

module.exports = forecast