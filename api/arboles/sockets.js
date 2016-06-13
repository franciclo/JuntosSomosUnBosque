
io.on('connection', function(socket) {
    socket.on('voto', function(voto){
	    var new_voto = Voto({
			valor:voto.valor,
			txt:voto.txt
		});
		new_voto.save(function(err, vot){
			if(err) throw err;
			io.emit('nuevo voto', vot);
		});
	});
});