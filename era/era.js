var Ticketscript = {};
Ticketscript.Application = {
	containerId: "ts-shop",
	channel: "L9LFBPY4",
	eventId: "",
	type: "iframe",
	language: "nl"
};

(function() { 
	let camera, scene, renderer;
	let video, videoTexture,videoMaterial;
	let composer;
	let shaderTime = 0;
	let badTVParams, badTVPass;		
	let staticParams, staticPass;		
	let rgbParams, rgbPass;	
	let filmParams, filmPass;	
	let renderPass, copyPass;
	let gui;
	let pnoise, globalParams;
	let volume, intensity;
	let multiplier = 1;
	let audio = document.getElementById('audio');

	function init() {

		camera = new THREE.PerspectiveCamera(55, 1080 / 720, 20, 3000);
		camera.position.z = 1000;
		scene = new THREE.Scene();

		//Load Video
		video = document.createElement('video');
		video.loop = true;
		video.src = 'res/video/era-3.mp4';
		video.play();

		if(video.paused || window.webkitAudioContext) {
			$('logo, body').click(function() {
				if(audio.paused) {
					audio.play();
				}
			});
			
			invokeTicketshop();
			return false;
		}
		else {
			$('#logo').hide();
		}

		//init video texture
		videoTexture = new THREE.Texture(video);
		videoTexture.minFilter = THREE.LinearFilter;
		videoTexture.magFilter = THREE.LinearFilter;

		videoMaterial = new THREE.MeshBasicMaterial( {
			map: videoTexture
		} );

		//Add video plane
		let planeGeometry = new THREE.PlaneGeometry( 1080, 720,1,1 );
		let plane = new THREE.Mesh( planeGeometry, videoMaterial );
		scene.add( plane );
		plane.z = 0;
		plane.scale.x = plane.scale.y = 1.45;

		//init renderer
		renderer = new THREE.WebGLRenderer();
		renderer.setSize($(window).width(), $(window).height());
		$('#era').append(renderer.domElement)

		//POST PROCESSING
		//Create Shader Passes
		renderPass = new THREE.RenderPass( scene, camera );
		badTVPass = new THREE.ShaderPass( THREE.BadTVShader );
		rgbPass = new THREE.ShaderPass( THREE.RGBShiftShader );
		filmPass = new THREE.ShaderPass( THREE.FilmShader );
		staticPass = new THREE.ShaderPass( THREE.StaticShader );
		copyPass = new THREE.ShaderPass( THREE.CopyShader );

		//set shader uniforms
		filmPass.uniforms.grayscale.value = 0;

		//Init DAT GUI control panel
		badTVParams = {
			mute:true,
			show: true,
			distortion: 3.0,
			distortion2: 1.0,
			speed: 0.3,
			rollSpeed: 0.1
		};

		staticParams = {
			show: true,
			amount: 0.5,
			size: 4.0
		};

		rgbParams = {
			show: true,
			amount: 0.005,
			angle: 0.0,
		};

		filmParams = {
			show: true,
			count: 800,
			sIntensity: 0.9,
			nIntensity: 0.4
		};

		onToggleShaders();
		onToggleMute();
		onParamsChange();

		window.addEventListener('resize', onResize, false);
		renderer.domElement.addEventListener('click', randomizeParams, false);
		onResize();
		importAudio();
		animate();
	}

	function onParamsChange() {
		//copy gui params into shader uniforms
		badTVPass.uniforms['distortion'].value = badTVParams.distortion;
		badTVPass.uniforms['distortion2'].value = badTVParams.distortion2;
		badTVPass.uniforms['speed'].value = badTVParams.speed;
		badTVPass.uniforms['rollSpeed'].value = badTVParams.rollSpeed;
		staticPass.uniforms['amount'].value = staticParams.amount;
		staticPass.uniforms['size'].value = staticParams.size;
		rgbPass.uniforms['angle'].value = rgbParams.angle * Math.PI;
		rgbPass.uniforms['amount'].value = rgbParams.amount;
		filmPass.uniforms['sCount'].value = filmParams.count;
		filmPass.uniforms['sIntensity'].value = filmParams.sIntensity;
		filmPass.uniforms['nIntensity'].value = filmParams.nIntensity;
	}

	function loopRandomize() {
		setInterval(function() {
			randomizeParams();
		}, 5000)
	}

	function randomizeParams() {

		if (Math.random() < 0.2){
			badTVParams.distortion = 0.1;
			badTVParams.distortion2 =0.1;
			badTVParams.speed =0;
			badTVParams.rollSpeed =0;
			rgbParams.angle = 0;
			rgbParams.amount = 0;
			staticParams.amount = 0;

		} else {
			badTVParams.distortion = Math.random()*10+0.1;
			badTVParams.distortion2 =Math.random()*10+0.1;
			badTVParams.speed =Math.random()*0.4;
			badTVParams.rollSpeed =Math.random()*0.2;
			rgbParams.angle = Math.random()*2;
			rgbParams.amount = Math.random()*0.03;
			staticParams.amount = Math.random()*0.2;
		}
		onParamsChange();
	}

	function applyWavelengths(frequency) {
		if (frequency < 0.2){
			badTVParams.distortion = 0.1;
			badTVParams.distortion2 = 0.1;
			badTVParams.speed = 0;
			badTVParams.rollSpeed = 0;
			rgbParams.angle = 0;
			rgbParams.amount = 0
			staticParams.amount = 0.1;

		} else {
			badTVParams.distortion = randomOffsetRange(frequency - 0.05, frequency + 0.15) * 2.5 + 0.1;
			badTVParams.distortion2 = randomOffsetRange(frequency - 0.05, frequency + 0.15) * 2.5 + 0.1;
			badTVParams.speed = randomOffsetRange(frequency - 0.05, frequency + 0.15) * 0.3;
			badTVParams.rollSpeed = randomOffsetRange(frequency - 0.20, frequency - 0.15) * 0.05;
			rgbParams.angle =  randomOffsetRange(frequency - 0.05, frequency + 0.15) * 0.025;
			rgbParams.amount = randomOffsetRange(frequency - 0.05, frequency + 0.15) * 0.010;
			staticParams.amount = randomOffsetRange(frequency - 0.05, frequency + 0.15) * 0.35;
		}

		onParamsChange();
	}

	function randomOffsetRange(min, max) {
		return Math.random() * (max - min) + min;
	}


	function importAudio() {
		let ctx = new AudioContext();
		audio.crossOrigin = "anonymous";
		let audioSrc = ctx.createMediaElementSource(audio);
		audioSrc.connect(ctx.destination);
		let analyser = ctx.createAnalyser();
		audioSrc.connect(analyser);
		let frequencyData = new Uint8Array(analyser.frequencyBinCount);

		function renderFrame() {
			let delay = setTimeout(function() {
				requestAnimationFrame(renderFrame);
			}, 100)
			analyser.getByteFrequencyData(frequencyData);
			applyWavelengths((frequencyData[150] / 255));
		}
		audio.play();
		renderFrame();
	}

	function onToggleMute(){
		video.volume  = badTVParams.mute ? 0 : 1;
	}

	function onToggleShaders(){

		//Add Shader Passes to Composer
		//order is important 
		composer = new THREE.EffectComposer( renderer);
		composer.addPass( renderPass );
		
		if (filmParams.show){
			composer.addPass( filmPass );
		}

		if (badTVParams.show){
			composer.addPass( badTVPass );
		}

		if (rgbParams.show){
			composer.addPass( rgbPass );
		}

		if (staticParams.show){
			composer.addPass( staticPass );
		}

		composer.addPass( copyPass );
		copyPass.renderToScreen = true;
	}

	function animate() {
		shaderTime += 0.1;
		badTVPass.uniforms['time'].value = shaderTime;
		filmPass.uniforms['time'].value = shaderTime;
		staticPass.uniforms['time'].value = shaderTime;

		if(video.readyState === video.HAVE_ENOUGH_DATA) {
			if(videoTexture) videoTexture.needsUpdate = true;
		}

		requestAnimationFrame( animate );
		composer.render(0.15);
	}

	function invokeTicketshop() {
		let countdown = setTimeout(function() {
			$('.iframe-container').fadeIn();
		}, 8000);
	}

	function onResize() {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}

	init();
	invokeTicketshop();

})();
