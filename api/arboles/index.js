module.exports = function(app){
	var server = require('http').Server(app);
	var io = require('socket.io')(server);

	require('./routes')(app);
}
