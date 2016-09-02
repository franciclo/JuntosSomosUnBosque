module.exports = function (app, passport) {
  app.get('/especies', require('./especies'))
  app.get('/red', require('./red'))
  app.get('/arboles', require('./arboles'))
}
