// Basic Google Maps code to place it inside #map and push a marker on it, the marker has a click event for user feedback
var initMap = function() {
	var mapDiv = document.getElementById('map');
	var map = new google.maps.Map(mapDiv, {
		center: {lat: 41.901000, lng: 12.500062},
		zoom: 12
	});

	// NEW ENTRY
    var infowindow1 = new google.maps.InfoWindow({
      content: "Roma Termini"
    });

	var marker1 = new google.maps.Marker({
	    position: {lat: 41.901000, lng: 12.500062},
	    map: map,
	    animation: google.maps.Animation.DROP,
    	title: "Roma Termini",
  	});

	marker1.addListener('click', function() {
        infowindow1.open(map, marker1);
	});

	// NEW ENTRY
    var infowindow2 = new google.maps.InfoWindow({
      content: "Colosseum"
    });

	var marker2 = new google.maps.Marker({
	    position: {lat: 41.890210, lng: 12.492231},
	    map: map,
	    animation: google.maps.Animation.DROP,
    	title: "Colosseum"
  	});

	marker2.addListener('click', function() {
        infowindow2.open(map, marker2);
	});

	// NEW ENTRY
    var infowindow3 = new google.maps.InfoWindow({
      content: "Spaanse trappen"
    });

	var marker3 = new google.maps.Marker({
	    position: {lat: 41.905698, lng: 12.482327},
	    map: map,
	    animation: google.maps.Animation.DROP,
    	title: "Spaanse trappen"
  	});

	marker3.addListener('click', function() {
        infowindow3.open(map, marker3);
	});

	// NEW ENTRY
    var infowindow4 = new google.maps.InfoWindow({
      content: "Vaticaanstad"
    });

	var marker4 = new google.maps.Marker({
	    position: {lat: 41.902361, lng: 12.459333},
	    map: map,
	    animation: google.maps.Animation.DROP,
    	title: "Vaticaanstad"
  	});

	marker4.addListener('click', function() {
        infowindow4.open(map, marker4);
	});

	// NEW ENTRY
    var infowindow5 = new google.maps.InfoWindow({
      content: "Trevifontijn"
    });

	var marker5 = new google.maps.Marker({
	    position: {lat: 41.900933, lng: 12.483313},
	    map: map,
	    animation: google.maps.Animation.DROP,
    	title: "Trevifontijn"
  	});

	marker5.addListener('click', function() {
        infowindow5.open(map, marker5);
	});

	// NEW ENTRY
    var infowindow6 = new google.maps.InfoWindow({
      content: "Pantheon"
    });

	var marker6 = new google.maps.Marker({
	    position: {lat: 41.898464, lng: 12.476885},
	    map: map,
	    animation: google.maps.Animation.DROP,
    	title: "Pantheon"
  	});

	marker6.addListener('click', function() {
        infowindow6.open(map, marker6);
	});

	// NEW ENTRY
    var infowindow7 = new google.maps.InfoWindow({
      content: "Forum Romanum"
    });

	var marker7 = new google.maps.Marker({
	    position: {lat: 41.892462, lng: 12.485325},
	    map: map,
	    animation: google.maps.Animation.DROP,
    	title: "Forum Romanum"
  	});

	marker7.addListener('click', function() {
        infowindow7.open(map, marker7);
	});

	// NEW ENTRY
    var infowindow8 = new google.maps.InfoWindow({
      content: "Piazza Venezia - Vittoriano"
    });

	var marker8 = new google.maps.Marker({
	    position: {lat: 41.894584, lng: 12.483103},
	    map: map,
	    animation: google.maps.Animation.DROP,
    	title: "Piazza Venezia - Vittoriano"
  	});

	marker8.addListener('click', function() {
        infowindow8.open(map, marker8);
	});

	// NEW ENTRY
    var infowindow9 = new google.maps.InfoWindow({
      content: "Paletijns (grootste van de 7 heuvels van Rome)"
    });

	var marker9 = new google.maps.Marker({
	    position: {lat: 41.889404, lng: 12.487466},
	    map: map,
	    animation: google.maps.Animation.DROP,
    	title: "Paletijn"
  	});

	marker9.addListener('click', function() {
        infowindow9.open(map, marker9);
	});

	// NEW ENTRY
    var infowindow10 = new google.maps.InfoWindow({
      content: "Aeroporto di Roma Fiumicino"
    });

	var marker10 = new google.maps.Marker({
	    position: {lat: 41.792079, lng: 12.252331},
	    map: map,
	    animation: google.maps.Animation.DROP,
    	title: "Aeroporto di Roma Fiumicino"
  	});

	marker10.addListener('click', function() {
        infowindow10.open(map, marker10);
	});


	// NEW ENTRY
    var infowindow11 = new google.maps.InfoWindow({
      content: "Dierentuin van Rome"
    });

	var marker11 = new google.maps.Marker({
	    position: {lat: 41.917116, lng: 12.487764},
	    map: map,
	    animation: google.maps.Animation.DROP,
    	title: "Aeroporto di Roma Fiumicino"
  	});

	marker11.addListener('click', function() {
        infowindow11.open(map, marker11);
	});

}

