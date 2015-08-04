var geocoderProvider = 'openstreetmap';
var httpAdapter = 'http';

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);


module.exports = {
	geoFind: function(spot, cb) {
		geocoder.geocode(spot, function(err, res) {
			if(err) {
				console.log(err)
			}

			console.log(res[0])
			cb(res[0])
		})
	}
}