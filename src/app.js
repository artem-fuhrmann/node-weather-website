const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000




const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tom Fuhrmann'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Tom Fuhrmann"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need help?',
        name: "Tom Fuhrmann"
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.location) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.location, (error, {latitude, longtitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
    
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error) {
            return res.send({error})
            }
            return res.send({
                location,
                forecastData,

            })
            
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
 
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: "Tom Fuhrmann",
        errorMessage: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'PAGE NOT FOUND',
        name: "Tom Fuhrmann",
        errorMessage: 'OOOPSY! This page doesn\'t exist'

    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})