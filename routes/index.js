var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var moment = require('moment');

var geocoderProvider = 'google';
var httpAdapter = 'http';

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lets Go Fish' });
});

router.post('/', function(req, res) {
	geocoder.geocode(req.body.location, function(err, res) {
		if(err) {
			res.render('/', {error: 'Unable to find location.'})
			return;
		} else {
			console.log(res)
		}


	})


})



router.get('/matapeake', function(req, res) {
	fetch('http://api.aerisapi.com/batch/38.926,-76.391?requests=/observations,/forecasts,/tides?filter=highlow&client_id=iTdIAjhd3NDNxOaEiuWoO&client_secret=uvoj4tMptzPqHxQZ2AcrokrlLaOnby7ZQQWjuJ0V')
	.then(function(res) {
		return res.json();
	}).then(function(json) {
		var loc = json.response.responses[0].response.place;
		var ob = json.response.responses[0].response.ob;
		var tide = json.response.responses[2].response[0];
		var low_o = moment(json.response.responses[2].response[0].periods[0].dateTimeISO).format('LLLL');
		var low_t = moment(json.response.responses[2].response[0].periods[2].dateTimeISO).format('LLLL');
		var high_o = moment(json.response.responses[2].response[0].periods[1].dateTimeISO).format('LLLL');
		var high_t = moment(json.response.responses[2].response[0].periods[3].dateTimeISO).format('LLLL');
		//var date = new Date(json.response.responses[2].response[0].periods[0].dateTimeISO).toString()

		console.log(low_o, low_t, high_o, high_t)
		res.render('matapeake', {location: loc.name, temp: ob.tempF, weather: ob.weather})
	})
});



module.exports = router;
