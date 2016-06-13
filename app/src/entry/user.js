(function(){
	
	require('section/homeUser/index.js');

	document.addEventListener("DOMContentLoaded", function () {
		require('history').go('home');
	});
	
}());