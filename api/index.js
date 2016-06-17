var express = require('express')
var app = express()
var config = require('./config')
var port = process.env.PORT || config.port
var mongoose = require('mongoose')

var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
app.set('superSecret', config.secret)
mongoose.connect(config.db)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('../app/public'))
require('./auth')(app)
require('./entry')(app)
require('./validations')(app)

app.listen(port)
console.log('Juntos Somos Un Bosque en puerto ' + port)
