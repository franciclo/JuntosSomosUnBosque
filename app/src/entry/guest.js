(function(){
	require('section/homeGuest/index.js');

	document.addEventListener("DOMContentLoaded", function () {
		require('history').go('home');
	});
	
}());