var main = (function() {
	"use strict"

	function getPoiConfirmation(poi) {
		objectApi.getLongId(poi.description)
	};
	function getPoiRemoval(poi) {
		objectApi.removeHtmlReference(poi.description)
	}

	var global = {
		init: function() {
			router.init()
			console.log('initated router')
			if(local.init()) {
				console.log('found settings')
				mapApi.localSettings = local.retrieve('localSettings');
				mapApi.startMapTracking();
				return false;
			}
			mapApi.getHouseGeolocations()
			console.log('no current settings found')
		}
	}

	var router = {
		init: function() {

			var self = this;

			window.addEventListener("hashchange", function(event) {
				self.toggle(window.location.hash);
				console.log('changed')
			});

			self.toggle(window.location.hash)

		},

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

			[].forEach.call(document.querySelectorAll('body > section'), function(value) {
				if(route === value.id) {
					value.classList.remove('no-display')
				}
				else {
					value.classList.add("no-display");
				}
			})
		}
	};

	var mapApi = {
		getHouseGeolocations: function() {
			var self = this;

			// i 8411-8419
			// j 5383-5389

			for(var i = 8411; i < 8413; i++) {
				for(var j = 5383; j < 5385; j++) {
			        var script = document.createElement('script');
			        script.src = 'http://mt1.funda.nl/maptiledata.ashx?z=14&x=' + i + '&y=' + j + '&zo=koop/heel-nederland&callback=fundaData';
			        document.body.appendChild(script);

					window.fundaData = function(data) {
						self.mapApiData.push(data)
						document.currentScript.remove()

						console.log(self.mapApiData)

						// 48

						if(self.mapApiData.length === 4) {
							console.log('all data loaded, importing settings')
							self.importSettings();
						}
					};

				}
			}
		},

		importSettings: function() {
			var self = this;

			return new Promise(function(resolve, reject) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'js/settings.json', true);
				xhr.onload = resolve;
				xhr.onerror = reject;
				xhr.send();
			})
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
				            "onEnter":"#/roam/" + self.mapApiData[j].points[i].id,
				            "onExit":"#/roam"
				        })
					}					
				}

				console.log('all settings stored, initiating map')
				console.log(self.mapApiData)

				console.log('inserted data in localstorage')
				local.insert('localSettings', self.localSettings)

				self.startMapTracking();

			})
		},

		startMapTracking: function() {

			cmdgeo.loadSettings(this.localSettings);
			cmdgeo.track();	
			cmdgeo.loadmap();
		},

		mapApiData: [],
		localSettings: {}
	};

	var objectApi = {
		getLongId: function(poi) {
			var self = this;

			return new Promise(function(resolve, reject) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'http://funda.kyrandia.nl/tinyId/' + poi, true);
				xhr.onload = resolve;
				xhr.onerror = reject;
				xhr.send();
			})
			.then(function(e) {
				var data = util.parse(e.target.response);
				self.getObjectDetails(data[0].intid, poi);
			})
		},
		getObjectDetails: function(intid, poi) {
			var self = this;

			return new Promise(function(resolve, reject) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/e2d60e885b8742d4b0648300e3703bd7/koop/' + intid, true);
				xhr.onload = resolve;
				xhr.onerror = reject;
				xhr.send();
			})
			.then(function(e) {
				var data = util.parse(e.target.response);
				console.log(data);
				console.log(poi);
				self.createHtmlReference(data, poi);
			})
		},

		createHtmlReference: function(data, poi) {
			var add = document.getElementById('track-box').classList.add('no-display')
			var container = document.getElementById('house-preview')
			var ts = `<div id="${poi}">
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

		removeHtmlReference: function(poi) {
			var target = document.getElementById(String(poi))
			target.remove();
			var remove = document.getElementById('track-box').classList.remove('no-display')
		}
	}

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

	global.init();

	return { getPoiConfirmation: getPoiConfirmation,
			 getPoiRemoval: getPoiRemoval }

})()