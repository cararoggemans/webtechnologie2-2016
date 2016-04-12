/*global  $, Skycons*/
// function css() { } --> naam van functie al reeds gedefinieerd bij gebruik van meerdere libraries (jquery, modernizer,...) =scope
// --> hier vanaf stappen om conflicten te voorkomen
// variabele in functie: var bestaat enkel in functie

//anonieme functie:
(function () {
	'use strict';
	
	var App = {
		APIKEY: "be29a02751191bcc58c8c719591f0cc4",
		// op deze manier kan je overal in app aan de huidige locatie:
		lat: "",
		lng: "",
		
		init: function () {
			App.getLocation();
			//start de app
		},
		getLocation: function () {
			//current location verkrijgen
			navigator.geolocation.getCurrentPosition(App.foundPosition);
		},
		
		foundPosition: function (pos) {
			//krijgt één par binnen namelijk de positie: deze noemen we bv pos
			App.lat = pos.coords.latitude;
			App.lng = pos.coords.longitude;
			App.getWeather();
		},
		
		getWeather: function () {
			// verkrijg current weather voor huidige locatie
			var url = "https://api.forecast.io/forecast/" + App.APIKEY + "/" + App.lat + "," + App.lng;
			console.log(url);
			//werken met JSONP: waarom niet gewoon JSON gebruiken, waarom is dit onveilig onveilig: hackers kunnen via login form met keydown alle paswoorden binnenhalen, bij JSONP gebeurt dit via omweg waardoor dit niet meer mogelijk is
			window.jQuery.ajax({
				url: url,
				dataType: "jsonp",
				success: function (data) {
					$(".weather-summary").text(data.currently.summary);
				}
            });
		}
		
	};
	
	App.init();
	
}()); // hij kent een app en variabele maar wordt nog niet uitgevoerd--> functie aanroepen via init: function () { },
//use strict: geen variabele kunnen gebruiken als deze niet gedeclareerd is, wanneer deze niet gedeclareerd is: kan globaal conflicteren met een andere variabele uit een library.