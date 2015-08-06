var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var moment = require('moment');
var jq = require('json-query');
var app = express();
var data = require('../db/fishData.json');
var users = require('../services/users');



/*var geo = require('../services/geofinder')

var geocoderProvider = 'openstreetmap';
var httpAdapter = 'http';

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);*/



/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Lets Go Fish' });
});


router.get('/signup', function(req, res) {
  res.render('signup')
})

router.post('/signup', function(req, res) {
  console.log('Looking for email=', req.body.emailAddress)
  users.findByEmailAddress(req.body.emailAddress, function(user) {
    if(user) {
      res.render('signup', { emailAddress: req.body.emailAddress, error: 'User already exists' })
    } else {
      users.createUser({ userName: req.body.userName, emailAddress: req.body.emailAddress, password: req.body.password }, function(user){
        console.log("User created id=", user.id)
        res.cookie('userId', user.id, { signed: true }).redirect('profile')
      })
    }
  })
})

router.get('/login', function(req, res) {
  res.render('login')
})

router.post('/login', function(req, res) {
  users.authenticate(req.body.emailAddress, req.body.password, function(user) {
    if(user) {
      res.cookie('userId', user.id, { signed: true }).redirect('profile')
    } else {
      res.render('login', { emailAddress: req.body.emailAddress, error: 'Log In Failed' })
    }
  })
})

router.get('/profile', function(req, res) {
  users.profile(req.signedCookies.userId, function(user) {
    if(req.signedCookies.userId) {
      res.render('profile', {userName: user.user_name})
    } else {
      res.render('login', {error: 'Please Log In'})
    }
  })
})


router.get('/logout', function(req, res) {
  res.clearCookie('userId').redirect('/')
})


router.post('/location', function(req, res) {
	console.log(req.body.name)
	var latitude = jq('collection[name='+req.body.name+'].latitude', {data: data}).value
	console.log(latitude)
	var longitude = jq('collection[name='+req.body.name+'].longitude', {data: data}).value
	console.log(longitude)
	var water = jq('collection[name='+req.body.name+'].location', {data:data}).value
	console.log('http://api.aerisapi.com/batch/'+latitude+','+longitude+'?requests=/observations,/forecasts,/tides?filter=highlow&client_id=iTdIAjhd3NDNxOaEiuWoO&client_secret=uvoj4tMptzPqHxQZ2AcrokrlLaOnby7ZQQWjuJ0V')

	fetch('http://api.aerisapi.com/batch/'+latitude+','+longitude+'?requests=/observations,/forecasts,/tides?filter=highlow&client_id=iTdIAjhd3NDNxOaEiuWoO&client_secret=uvoj4tMptzPqHxQZ2AcrokrlLaOnby7ZQQWjuJ0V')
	.then(function(res) {
		return res.json();
	}).then(function(json) {
		var loc = json.response.responses[0].response.place.name;
		var ob = json.response.responses[0].response.ob;
		var low_o = moment(json.response.responses[2].response[0].periods[0].dateTimeISO).format('h:mm a');
		var low_t = moment(json.response.responses[2].response[0].periods[2].dateTimeISO).format('h:mm a');
		var high_o = moment(json.response.responses[2].response[0].periods[1].dateTimeISO).format('h:mm a');
		var title = req.body.name;
		var loca = loc.toUpperCase();
		var icon = 'http://www.shermanctweather.org/meteo1/icons/aeris/'+ob.icon;
		var currentTime = moment().format('llll');

		if (json.response.responses[2].response[0].periods[3]) {

			var high_t = moment(json.response.responses[2].response[0].periods[3].dateTimeISO).format('h:mm a');
			console.log(high_t);

		} else { 

			var high_t = "No Data Available"

		}


		//var date = new Date(json.response.responses[2].response[0].periods[0].dateTimeISO).toString()

		console.log(low_o, low_t, high_o, high_t, loc, icon)
		res.render('location', {time: currentTime, low_one: low_o, low_two: low_t, high_one: high_o, high_two: high_t, title: title, water: water, location: loca, temp: ob.tempF, weather: ob.weather, icon: icon})
	})





});



module.exports = router;
