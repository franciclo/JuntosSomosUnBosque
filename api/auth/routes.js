var isLoggedIn = require('./middleware').isLoggedIn;

module.exports = function(app, passport) {
    
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    require('./facebook/routes')(app, passport);
    require('./google/routes')(app, passport);
    require('./local/routes')(app, passport);
    require('./twitter/routes')(app, passport);
};