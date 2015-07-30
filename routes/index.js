var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lets Go Fish' });
});

router.get('/matapeake', function(req, res) {
	fetch('http://api.wunderground.com/api/30cc3e05d34dd457/conditions/forecast/tide/q/MD/Stevensville.json')
	.then(function(res) {
		return res.json();
	}).then(function(json) {
		res.render('matapeake', {location: json.current_observation.display_location.full, temp: json.current_observation.temp_f, weather: json.current_observation.weather})
	})
});



module.exports = router;
