const express = require('express');
const request = require('request');
const gmaps = require('./gmaps.js');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');


const port = process.env.PORT || 8080;
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
var weather = ''; //variable to hold the weather info
var imgURL = ''; // variable to hold img url

app.use((request,response,next) => {
	var time = new Date().toString();
	// console.log(`${time}: ${request.method} ${request.url}`);
	var log = `${time}: ${request.method} ${request.url}`;
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Unable to log message');
		}
	});
	next();
});

// app.use((request,response,next) =>{
// 	response.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('message', (text) => {
	return text
})

app.post('/viewweather',(request,response) => {
	place = request.body.search
	gmaps.getAddress(place).then((coordinates) => {
		console.log(coordinates);
		gmaps.getWeather(coordinates.lat, coordinates.long).then((response1) =>{
			console.log(response1.status);
			weather = `The weather in ${place} is ${response1.status} and is ${response1.temperature} degrees`
			response.render('weather.hbs', {
				weather: weather
		})
		})
	})
})

app.get('/info', (request,response) => {
	response.render('info.hbs', {
		title: 'About Page',
		year: new Date().getFullYear(),
		welcome: 'Hello! welcome to my home page',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpj2QhGNsG2rvyXo0HaHm1cyKvrxVAq2o_3iVVYPQONb8jxdCM'
	});
})

// gmaps.getImage('batman').then((image) => {
// 	console.log('hey');
// 	})

app.get('/',(request,response) => {
	imgsearch = request.body.img
	gmaps.getImage(imgsearch).then((image) => {
		imgURL = image
	})
	response.render('about.hbs', {
		title: 'About Page',
		year: new Date().getFullYear(),
		welcome: 'Hello! welcome to my home page',
		image: imgURL
	});
})

app.post('/',(request,response) => {
	imgsearch = request.body.img
	gmaps.getImage(imgsearch).then((image) => {
		imgURL = image
	})
	response.render('about.hbs', {
		title: 'About Page',
		year: new Date().getFullYear(),
		welcome: 'Hello! welcome to my home page',
		image: imgURL
	});
})

app.get('/weather', (request, response) => {
	response.render('weather.hbs', {
		title: 'About Page',
		year: new Date().getFullYear(),
		welcome: 'Hello! welcome to my home page',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpj2QhGNsG2rvyXo0HaHm1cyKvrxVAq2o_3iVVYPQONb8jxdCM',
		weather : weather
	});
})

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
    // here add the logic to return the weather based on the statically provided location and save it inside the weather variable
    //     gmaps.getWeather(47.6062, 122.3321).then((result) => {
    //     weather = 'The weather in seattle is ' + result.status + ' and is ' + result.temperature + ' degrees'
    // });
});