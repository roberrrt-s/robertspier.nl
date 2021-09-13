var main = (function() {
	"use strict"

	// Declaring the functions cmdgeo.js requires on top, due to strict mode;
	function getPoiConfirmation(poi) {
		objectApi.getLongId(poi.description)
	};
	function getPoiRemoval(poi) {
		objectApi.removeHtmlReference(poi.description)
	}

	// Main controller object
	var global = {
		init: function() {
			router.init()
			console.log('initated router')
			// If we have an instance of localStorage containing previous data, load it to save time and new queries.
			if(local.init()) {
				console.log('found settings')
				mapApi.localSettings = local.retrieve('localSettings');
				mapApi.startMapTracking();
				return false;
			}
			// If not, get new geolocations from the mapApi
			mapApi.getHouseGeolocations()
			console.log('no current settings found, getting new data from the mapApi')

		}
	}

	var router = {
		init: function() {

			var self = this;

			window.addEventListener("hashchange", function(event) {
				self.toggle(window.location.hash);
				console.log('hash changed to new location')
			});

			self.toggle(window.location.hash)

		},

		// Very, very lightweight and basic routing using a switch statement.
		toggle: function(route) {
			switch(route) {
				case '':
				case "#/home": 
					route = "home-container";
					break;

				case "#/roam":
					route = "tracker-container";
					break;

				case "#/saved":
					route = "saved-container";
					break;

				default: 
					window.location.hash = "#/home";
			}

			// Defining all page elements that are pages
			[].forEach.call(document.querySelectorAll('body > section'), function(value) {
				if(route === value.id) {
					// Removing the active page no-display
					value.classList.remove('no-display')
				}
				else {
					// Adding it on the other ones
					value.classList.add("no-display");
				}
			})
		}
	};

	// Main object to communicate with the mapApi
	var mapApi = {
		getHouseGeolocations: function() {
			var self = this;

			// These tiles cover the whole city of Amsterdam, which gives me 1600 pois, Google Maps disagreed and made the page load slow as hell.
			// Future feature will have a possiblilty to pre-load all this data, and then display it when you enter that specific tile, should.

			// i 8411-8419
			// j 5383-5389

			// Creating a roster of tiles
			for(var i = 4206; i < 4208; i++) {
				for(var j = 2691; j < 2693; j++) {
					var script = document.createElement('script');
					script.src = 'http://mt1.funda.nl/maptiledata.ashx?z=13&x=' + i + '&y=' + j + '&zo=koop/heel-nederland&callback=fundaData';
					document.body.appendChild(script);

					// Upon receiving the JSONP request, save the data in mapApiData, and remove the JSONP script.
					window.fundaData = function(data) {
						self.mapApiData.push(data)
						document.currentScript.remove()

						console.log("new data: " + self.mapApiData)

						// 48
						// Yeah, this currently resembles the amount of tiles, it's cleaner than every other option that wouldn't involve more specific programming, MoSCoW
						if(self.mapApiData.length === 4) {
							self.importSettings();
						}
					};

				}
			}
		},

		// Importing all mapApi settings from the external settings file.
		importSettings: function() {
			var self = this;

			// Using a promise to initate a new xhr.
			return new Promise(function(resolve, reject) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'js/settings.json', true);
				xhr.onload = resolve;
				xhr.onerror = reject;
				xhr.send();
			})

			// When done loading, parse the response and add all the mapApiData into the poi array.
			.then(function(e) {
				self.localSettings = util.parse(e.target.responseText);
				console.log(self.localSettings)

				for(var j = 0; j < self.mapApiData.length; j++) {
					for(var i = 0; i < self.mapApiData[j].points.length; i++) {
						self.localSettings.poiList.push({
							"name": self.mapApiData[j].points[i].adr,
							"description": self.mapApiData[j].points[i].id,
							"coordinate": {
								"latitude": self.mapApiData[j].points[i].y,
								"longitude": self.mapApiData[j].points[i].x
							},
							"radius": 100,
							"onEnter":"#/roam/",
							"onExit":"#/roam"
						})
					}					
				}

				console.log('all settings inserted in the localSettings variable, initiating map');
				self.startMapTracking();

				console.log('inserted data in localstorage');
				local.insert('localSettings', self.localSettings);
			})
		},

		// Initate the actual tracking, by loading the settings in cmdgeo, tracking the users position, and loading the map with markers.
		startMapTracking: function() {

			cmdgeo.loadSettings(this.localSettings);
			cmdgeo.track();	
			cmdgeo.loadmap();
		},

		mapApiData: [],
		localSettings: {}
	};

	// Object API .. object, I wish I could find a better name for this.
	var objectApi = {
		// Map API doesn't give me the proper query, so we have to initiate a workaround xhr.
		getLongId: function(poi) {
			var self = this;

			return new Promise(function(resolve, reject) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'http://funda.kyrandia.nl/tinyId/' + poi, true);
				xhr.onload = resolve;
				xhr.onerror = reject;
				xhr.send();
			})
			// When grabbing the intid, get the actual object.
			.then(function(e) {
				var data = util.parse(e.target.response);
				self.getObjectDetails(data[0].intid, poi);
			})
		},
		// Grabbing the object details, object means house in this case.
		getObjectDetails: function(intid, poi) {
			var self = this;

			return new Promise(function(resolve, reject) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/e2d60e885b8742d4b0648300e3703bd7/koop/' + intid, true);
				xhr.onload = resolve;
				xhr.onerror = reject;
				xhr.send();
			})

			// When done, parse response, and create a HTML reference for the user
			.then(function(e) {
				var data = util.parse(e.target.response);
				console.log(data);
				console.log(poi);
				self.createHtmlReference(data, poi);
			})
		},

		// Creating a HTML reference.
		createHtmlReference: function(data, poi) {
			var add = document.getElementById('track-box').classList.add('no-display')
			var container = document.getElementById('house-preview')
			// Figured the template string should have his own file, so importing it.
			var ts = 
			`<div id="${poi}">
				<div class="img-container"><img src="${data.HoofdFoto}"/></div>
				<div class="house-container">
					<div class="house-content">
						<ul>
							<li>
								<h2>${data.Adres}</h2>
							</li>
							<li>
					  			<h3>${data.Postcode} ${data.Plaats}</h3>
							</li>
				  		</ul>
					</div>
					<div class="house-info">
				  		<ul>
							<li>
								<h3>Vraagprijs: ${data.KoopPrijs} k.k.</h3>
							</li>
							<li>
								<h3>Aantal kamers: ${data.AantalKamers}</h3>
							</li>
				  		</ul>
					</div>
				</div>
				<div class="house-details">
					<button><a href="${data.MobileURL}">Bekijk op Funda.nl</a></button>
					<button id="save-button">Voeg toe aan favorieten</button>
			  	</div>
			</div>`

			container.innerHTML = ts;

			// Also giving the save options by cloning the element to the save list.
			var save = document.getElementById('save-button')
			save.addEventListener('click', function() {

				var clone = util.cloneHtml(container)
				var remove = document.getElementById('saved-box')
				if(remove) {
					remove.remove();
				}
				var append = document.getElementById('saved-container').appendChild(clone);
				var nosave = document.querySelector('#saved-container button#save-button').remove();
			})


		},

		// When we leave the house region, we have to delete it from the DOM.
		removeHtmlReference: function(poi) {
			var target = document.getElementById(String(poi))
			target.remove();
			var remove = document.getElementById('track-box').classList.remove('no-display')
		}
	}

	// Utility object.
	var util = {
		parse: function(data) {
			return JSON.parse(data);
		},
		stringify: function(data) {
			return JSON.stringify(data)
		},
		cloneHtml: function(elem) {
			return elem.cloneNode(true);
		}
	};

	// localStorage object.
	var local = {
		init: function() {
			if(local.retrieve('localSettings')) {
				return true;
			}
			else {
				return false;
			}
		},
		insert: function(name, data) {
			localStorage.setItem(name, util.stringify(data));
		},
		retrieve: function(name) {
			return util.parse(localStorage.getItem(name));
		},
		clear: function() {
			localStorage.clear();
		}
	}

	// Starting application.
	global.init();

	// Exporting functions for cmdgeo.js to use
	return { getPoiConfirmation: getPoiConfirmation,
			 getPoiRemoval: getPoiRemoval }

})()