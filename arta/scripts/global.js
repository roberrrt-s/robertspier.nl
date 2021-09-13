const APP = {
	NAME                  : 'artaphine',
	VERSION               : '1.0.0',
	AUTHOR                : 'Robert Spier',
	CREATION_DATE         : new Date().getFullYear(),
};

class App {
	constructor() {
		console.log(`${APP.NAME} ${APP.VERSION}, © ${APP.CREATION_DATE} ${APP.AUTHOR}`);
		this.loop();
	}

	loop() {
		var self = this;

		function doLoop() {
			var rand = (Math.random() > .25) ? self.random(50, 100) : self.random(1000, 1200)
			setTimeout(function() {
				self.glitch();
				doLoop();  
			}, rand);
		}
		doLoop();
	}

	glitch() {
		var imagePath = 'images/bg-image-1.jpg';
		var imgContainerEl = document.getElementById( 'img-container' );
		
		var params = {
			amount:     this.random(1, 100),
			iterations: this.random(1, 100),
			quality:    this.random(1, 100),
			seed:       this.random(1, 100)
		};

		loadImage( imagePath, function ( img ) {
			glitch( params )
				.fromImage( img )
				.toDataURL()
				.then( function( dataURL ) {
					var imageEl = new Image();
					imgContainerEl.style.backgroundImage = "url("+ dataURL +")";
				} );
		} );

		function loadImage ( src, callback ) {
			var imageEl = new Image();
			imageEl.onload = function () {
				callback( imageEl );
			};
			imageEl.src = src;
		}

	}

	random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
};

const app = new App();
