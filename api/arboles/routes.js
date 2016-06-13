module.exports = function(app){

	app.get('/', function(req, res){
		res.sendFile(__dirname + '/app/dist/index.html');
	});

	app.get('/votos', function(req, res){
		Voto.find({}, function(err, votos){
			if(err) throw err;
			res.json(votos);
		})
	});

	app.get('/borrar', function(req, res){
		Voto.remove({}, function(err){
			if(err) throw err;
			console.log('borro todo');
			res.json({borro: 'todo'})
		})
	});
};