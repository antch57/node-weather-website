const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000


// Define paths for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'ant'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'ant'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'This is a help message',
        name: 'ant'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a location.'
        });
    };
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        };

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            };

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            }); 
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        });
    };

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMessage: '404 Help article not found.',
        title: '404',
        name: 'ant'
    });
});

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage: '404 page not found.',
        title: '404',
        name: 'ant'
    });
});


app.listen(port, () => {
    console.log(`Express Server started on port ${port}.`);
});