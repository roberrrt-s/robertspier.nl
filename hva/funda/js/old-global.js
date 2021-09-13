
(function() {
	"use strict"

	var getData = function() {

		for(var i = 8411; i < 8419; i++) {
			for(var j = 5383; j < 5389; j++) {
		        var script = document.createElement('script');
		        script.src = 'http://mt1.funda.nl/maptiledata.ashx?z=14&x=' + i + '&y=' + j + '&zo=koop/heel-nederland&callback=fundaData';
		        document.body.appendChild(script);

				window.fundaData = function(data) {
					cmdHelper.fundaArray.push(data)
					document.currentScript.remove()

					if(cmdHelper.fundaArray.length === 48) {
						global.init()
						console.log('fire')
					}
				};

			}
		}
	}


	var global = {
		init: function() {
			cmdHelper.userPosition = util.getUserLocation();
		},
		initMaps: function() {
			cmdgeo.loadSettings(cmdHelper.storage);
			cmdgeo.track();	
			cmdgeo.loadmap();
		}
	};

	var cmdHelper = {
		importSettings: function() {
			return new Promise(function(resolve, reject) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'js/settings.json', true);
				xhr.onload = resolve;
				xhr.onerror = reject;
				xhr.send();
			})
			.then(function(e) {
				cmdHelper.storage = util.parse(e.target.responseText);
				cmdHelper.storage.mapOptions.center = cmdHelper.userPosition;

				for(var j = 0; j < cmdHelper.fundaArray.length; j++) {
					for(var i = 0; i < cmdHelper.fundaArray[j].points.length; i++) {
				        cmdHelper.storage.poiList.push({
				            "name": cmdHelper.fundaArray[j].points[i].adr,
				            "description": cmdHelper.fundaArray[j].points[i].id,
				            "coordinate": {
				                "latitude": cmdHelper.fundaArray[j].points[i].y,
				                "longitude": cmdHelper.fundaArray[j].points[i].x
				            },
				            "radius": 100,
				            "onEnter":"#/roam/" + cmdHelper.fundaArray[j].points[i].id,
				            "onExit":"#/roam"
				        })
					}					
				}


				global.initMaps();
			})
		},
		fundaArray: [],
		storage: {},
		userPosition: []
	}

	var funda = {
		request: function(method, url) {
			return new Promise(function(resolve, reject) {
				var xhr = new XMLHttpRequest();
				xhr.open(method, url, true);
				xhr.onload = resolve;
				xhr.onerror = reject;
				xhr.send();
			})
			.then(function(e) {
				console.log(e.target.response)
			})
		}
	};

	var util = {
		parse: function(data) {
			return JSON.parse(data);
		},
		stringify: function(data) {
			return JSON.stringify(data)
		},
		getUserLocation: function() {
		    navigator.geolocation.getCurrentPosition(
		        function(position){
		            cmdHelper.userPosition = [position.coords.latitude, position.coords.longitude]
		            cmdHelper.importSettings()
		        },
		        function(){
		            console.log("Geo Location not supported");
		        }
		    );    
		},

	}

	getData();

})()