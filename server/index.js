var express = require('express')
var app = express()
var config = require('./config')
var port = process.env.PORT || config.port || 3000
var mongoose = require('mongoose')

var passport = require('passport')
var flash = require('connect-flash')

var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')

mongoose.connect(config.mongodbURI)

require('./auth/controller')(passport)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('./public', {maxAge: 86400000}))

app.set('superSecret', config.secret)
app.use(session({ secret: 'klj234 lkj23ñlkfoewut2if jfnf' }))
app.use(passport.initialize())

app.use(passport.session())
app.use(flash())

require('./auth/routes')(app, passport)
require('./api')(app, passport)
require('./entry')(app)

app.listen(port)
console.log('Bosque en puerto ' + port)
