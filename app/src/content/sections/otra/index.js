require('./index.css');
var html = require('./index.html');

require('sections').register('otra', html, function(dom){

	function init(){

	}

	function destroy(c, r){}
	
	return {
		init: init,
		destroy: destroy
	}
});