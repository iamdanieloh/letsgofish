var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lets Go Fish' });
});

router.get('/matapeake', function(req, res) {
	fetch('http://api.aerisapi.com/batch/38.926,-76.391?requests=/observations,/forecasts,/tides?filter=highlow&client_id=iTdIAjhd3NDNxOaEiuWoO&client_secret=uvoj4tMptzPqHxQZ2AcrokrlLaOnby7ZQQWjuJ0V')
	.then(function(res) {
		return res.json();
	}).then(function(json) {
		var loc = json.response.responses[0].response.place;
		var ob = json.response.responses[0].response.ob;
		var tide = json.response.responses[2].response[0];
		var date = new Date(json.response.responses[2].response[0].periods[0].dateTimeISO).toString()

		console.log(date)
		res.render('matapeake', {location: loc.name, temp: ob.tempF, weather: ob.weather})
	})
});



module.exports = router;
