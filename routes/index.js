require('dotenv').load();
var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var moment = require('moment');
var jq = require('json-query');
var app = express();
var data = require('../db/fishData.json');
var users = require('../services/users');
var fs = require('fs');
var md5File = require('md5-file');
var AWS = require('aws-sdk');



var bucket = process.env.S3_BUCKET;
var s3 = new AWS.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
});


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
    if(user.email_address) {
      res.render('signup', { emailAddress: req.body.emailAddress, error: 'User already exists' })
    } else if (user.user_name) {
    	res.render('signup', { userName: req.body.userName, error: 'User already exists' })
    } else {
      users.createUser({ userName: req.body.userName, emailAddress: req.body.emailAddress, password: req.body.password }, function(user){
        console.log("User created id=", user.id)
        res.cookie('userId', user.id, { signed: true }).redirect('/')
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


router.get('/user_post', function(req, res) {
	if(req.signedCookies.userId) {
		res.render('user_post')
	} else {
		res.render('login', {error: 'Please Log In'})
	}
})


router.post('/user_post', function(req, res) {
	console.log(req.body);
	console.log(req.files);

	if(req.files.upload) {
	fileName = md5File(req.files.upload.path)+Date.now()+req.files.upload.originalname;
	console.log(fileName)
      var params = {
        Bucket: bucket,
        Key: fileName,
        ACL: 'public-read',
        Body: fs.readFileSync(req.files.upload.path),
      };
      s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });

    var photoLink = 'https://s3.amazonaws.com/'+bucket+'/'+fileName;

} else {
	var photoLink = '';
}

    users.createPost({userId: req.signedCookies.userId, tag: req.body.tag, userPost: req.body.userPost, upload: photoLink}, function(res) {
    	console.log('post created')
    	
    })

    res.render('user_post', {message: 'Post Created!'})

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
			console.log(high_t);


		if (!json.response.responses[2].response[0].periods[3]) {
			
			var high_t = "No Data Available"

		} else {

			var high_t = moment(json.response.responses[2].response[0].periods[3].dateTimeISO).format('h:mm a');

		}

		users.getPosts(req.body.name, function(posts) {
			console.log(posts)
			if(!posts) {
				console.log('no post')
				res.render('location', {
					time: currentTime, 
					low_one: low_o, 
					low_two: low_t, 
					high_one: high_o, 
					high_two: high_t, 
					title: title, 
					water: water, 
					location: loca, 
					temp: ob.tempF, 
					weather: ob.weather, 
					icon: icon,
				})
			} else {
				console.log('there is a post')
				res.render('location', {
					time: currentTime, 
					low_one: low_o, 
					low_two: low_t, 
					high_one: high_o, 
					high_two: high_t, 
					title: title, 
					water: water, 
					location: loca, 
					temp: ob.tempF, 
					weather: ob.weather, 
					icon: icon,
					posts: posts
				})
			}

		})

	})

});



module.exports = router;