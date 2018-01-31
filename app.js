// const yargs = require('yargs');
//
// const geocode = require('./geocode/geocode');
//
// const argv = yargs
//   .options({
//     address: {
//       demand: true,
//       alias: 'a',
//       describe: 'Address to fetch the weather for',
//       string: true
//     }
//   })
//   .help()
//   .alias('help', 'h')
//   .argv;
//
// geocode.geocodeAddress(argv.address, (errorMsg, results) => {
//   if(errorMsg) {
//     console.log(errorMsg);
//   } else {
//     console.log(JSON.stringify(results, undefined, 5));
//   }
// });


const request = require('request');

request({
  url: `https://api.darksky.net/forecast/aace21cfc1b53b495d767a9c4d44eafa/37.8267,-122.4233`,
  json: true
}, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    console.log(body.currently.temperature);
  } else {
    console.log('Unable to fetch weather');
  }
});
