const request = require('request');

var getWeather = (latitude,longitude) => {
	return new Promise((resolve,reject)=> {
		request({
	url:'https://api.darksky.net/forecast/8f0e1d9e31e8d062740bc53fbd75665c/' + latitude + ',' + longitude,
	json: true
}, (error,response,body) => {
	if (error) {
		reject('Cannot connect to darksky')
		// console.log('Cannot connect to Google Maps');
	} else if (body.code == '400') {
		reject('Cannot find requested Address');
		console.log(request.url);
		// console.log('Cannot find requested Address');
	} else if (body.timezone) {
		resolve({
			// address: body.results[0].formatted_address,
			// type: body.results[0].types[0]
			timezone: body.timezone,
			temperature: body.currently.temperature,
			humidity : body.currently.humidity,
			ozone : body.currently.ozone,
			status : body.currently.summary

		});
	// console.log(JSON.stringify(body.results[0].geometry.location,undefined,2));
	// console.log(`Your requested revenue: ${argv.a}`);
	// console.log(`Adress: ${body.results[0].formatted_address}`)
	// console.log(`Type: ${body.results[0].types[0]}`)

	};

});
	})
};

var getAddress = (address) => {
    return new Promise((resolve,reject)=> {
    request({
        url: 'http://maps.googleapis.com/maps/api/geocode/json' +
            '?address=' + encodeURIComponent(address),
        json: true
    }, (error, response, body) => {
        if (error) {
            reject('Cannot connect to Google Maps');
            //console.log('Cannot connect to Google Maps');
        } else if (body.status === 'ZERO_RESULTS') {
            reject('Cannot find requested address');
            //console.log('Cannot find requested address');
        } else if (body.status === 'OK') {
            resolve({
                lat: body.results[0].geometry.location.lat,
                long: body.results[0].geometry.location.lng
            });
        }
    });
    })

};

var getImage = (keyword) => {
    return new Promise((resolve,reject)=> {
    request({
        url: 'https://pixabay.com/api/?key=7246674-b37ac3e55b379cef1f626bb09&q=' + keyword,
        json: true
    }, (error, response, body) => {
        if (error) {
            reject('Cannot connect to Google Maps');
            //console.log('Cannot connect to Google Maps');
        } else if (body.status === 'ZERO_RESULTS') {
            reject('Cannot find requested address');
            //console.log('Cannot find requested address');
        } else if (body.status === 'OK') {
            resolve({
                // lat: body.results[0].geometry.location.lat,
                // long: body.results[0].geometry.location.lng
                img: hits.largeImageURL
            });
        }
    });
    })

};

module.exports = {
	getWeather,
	getAddress,
	getImage
};