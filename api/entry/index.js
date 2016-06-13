module.exports = function(app){
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/');

	app.get('/',function(req, res){
		if (req.isAuthenticated()){
			res.render('layout', {
		        sectionHtml: '../../app/src/content/sections/homeUser/index.html',
		        entryFilename: 'user'
		    });
		}else{
			res.render('layout', {
		        sectionHtml: '../../app/src/content/sections/homeGuest/index.html',
		        entryFilename: 'guest'
		    });
		}
	});

}
