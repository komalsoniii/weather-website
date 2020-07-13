const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c4c8081dfeb89b1d31db5d9c5be68181&query=' + longitude + ',' + latitude 
    request({ url, json:true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location!', undefined)
        } else { 
            callback(undefined, response.body.current.weather_descriptions[0] + ' It is currently '+ response.body.current.temperature + ' degress out. Feels like ' + response.body.current.feelslike + ' degress out.')
        }
    })
}

module.exports = forecast
