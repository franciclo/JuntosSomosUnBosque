module.exports = function (app, passport) {
  app.post('/logout', function (req, res) {
    // req.logout()
    req.session.destroy()
    res.json({
      success: true
    })
  })
  require('./facebook/routes')(app, passport)
  require('./google/routes')(app, passport)
  require('./local/routes')(app, passport)
  require('./twitter/routes')(app, passport)
}
