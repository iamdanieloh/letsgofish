var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lets Go Fish' });
});

router.get('/matapeake', function(req, res) {
	fetch('http://api.aerisapi.com/batch/43.567,-100.895?requests=/observations,/forecasts,/tides&client_id=iTdIAjhd3NDNxOaEiuWoO&client_secret=uvoj4tMptzPqHxQZ2AcrokrlLaOnby7ZQQWjuJ0V')
	.then(function(res) {
		return res.json();
	}).then(function(json) {
		var loc = json.response.responses[0].response.place;
		var ob = json.response.responses[0].response.ob;
		console.log(json.response.responses[0].response.place.name)
		res.render('matapeake', {location: loc.name, temp: 'test2', weather: 'test3'})
	})
});



module.exports = router;
