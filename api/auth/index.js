var passport = require('passport');
var session      = require('express-session');

module.exports = function(app){

	require('./controller')(passport);

	app.use(session({ secret: 'klj234 lkj23ñlkfoewut2if jfnf' }));
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions

	require('./routes')(app, passport);
}
