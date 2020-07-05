const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=42893a620a426eedd1d39360068dabc7&query='+ latitude +','+ longitude+'&units=m'

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error || body.location.name == null ){
            callback('Unable to provide weather information. please check your location', undefined)
        }else {
            callback(undefined, {
                weatherInfo: (body.current.weather_descriptions[0] +  '. It is currently ' + body.current.temperature + ' degrees out. But it feels like ' + body.current.feelslike + ' degrees out.'),
                location: body.location.name
            })
        }

    })
}

module.exports = forecast