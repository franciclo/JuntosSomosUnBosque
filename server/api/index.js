module.exports = function (app, passport) {
  // app.get('/cargar-especies', require('./cargar-especies'))
  app.get('/especies', require('./especies'))
  app.get('/red', require('./red'))
  app.get('/festivales', require('./festivales'))
  app.get('/arboles', require('./arboles'))
  require('./forms')(app, passport)
}
