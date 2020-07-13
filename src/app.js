const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//sets heroku port
const port = process.env.PORT || 3000 

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlerbar engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Komal Soni'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Komal Soni'  
    })   
}) 

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a weather app use to find temperature.',
        title: 'Help',
        name: 'Komal Soni'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you must provide an address.'
        })
    }
    /* res.send( {
        forecast:'It is too hot.',
        location:'Kolkata',
        address: req.query.address
    })*/
  
    geocode( req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast( longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            
        })
    
    })

})  



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'KomalSoni',
        errorMessage: 'Help article not found'
    })
})
    
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'KomalSoni',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port' + port + '.')
})

