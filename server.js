const express = require('express');
const hbs = require('hbs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('message', (text) => {
	return text.toUpperCase();
})

app.get('/', (request,response) => {
	// response.send('<h1>Hello Express!</h1>');
	response.send({
		name: 'Henry',
		school: [
		'BCIT',
		'SFU',
		'UBC']
	}) 
});

app.get('/info',(request,response) => {
	response.render('about.hbs', {
		title: 'About Page',
		year: new Date().getFullYear(),
		welcome: 'Hello!'
	});
})

app.get('/weather',(request,response) =>{
	response.render('weather.hbs'), {
		
	}
})

app.get('/404', (request,response) => {
	response.send({
		error: 'Page not found'
	})
})

app.listen(8080, () => {
	console.log('Server is up on the port 8080');
});