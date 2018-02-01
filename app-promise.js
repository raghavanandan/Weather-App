const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Address to fetch the weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');         // Throwing to catch block
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherURL = `https://api.darksky.net/forecast/<YOUR_API_KEY>/${lat},${lng}?units=si`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherURL);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}.C but feels like ${apparentTemperature}.C`);
}).catch((errorMsg) => {
  if(errorMsg.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers');
  } else {
    console.log(errorMsg.message);                          // Catching the ZERO_RESULTS error
  }
});
