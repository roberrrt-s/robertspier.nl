'use strict';

(function () {
	var camera = void 0,
	    scene = void 0,
	    renderer = void 0;
	var video = void 0,
	    videoTexture = void 0,
	    videoMaterial = void 0;
	var composer = void 0;
	var shaderTime = 0;
	var badTVParams = void 0,
	    badTVPass = void 0;
	var staticParams = void 0,
	    staticPass = void 0;
	var rgbParams = void 0,
	    rgbPass = void 0;
	var filmParams = void 0,
	    filmPass = void 0;
	var renderPass = void 0,
	    copyPass = void 0;
	var gui = void 0;
	var pnoise = void 0,
	    globalParams = void 0;
	var volume = void 0,
	    intensity = void 0;
	var audio = document.getElementById('audio');

	function initShader() {
		camera = new THREE.PerspectiveCamera(55, 1280 / 720, 20, 3000);
		camera.position.z = 1000;
		scene = new THREE.Scene();

		//Load Video
		video = document.createElement('video');
		video.loop = true;
		video.src = 'res/video/unpolished.mp4';
		video.play();

		if (video.paused || window.webkitAudioContext) {
			invokeTicketshop();
			return false;
		} else {
			document.getElementById('unpolished').style.backgroundImage = 'initial';
		}

		//init video texture
		videoTexture = new THREE.Texture(video);
		videoTexture.minFilter = THREE.LinearFilter;
		videoTexture.magFilter = THREE.LinearFilter;

		videoMaterial = new THREE.MeshBasicMaterial({
			map: videoTexture
		});

		//Add video plane
		var planeGeometry = new THREE.PlaneGeometry(1280, 720, 1, 1);
		var plane = new THREE.Mesh(planeGeometry, videoMaterial);
		scene.add(plane);
		plane.z = 0;
		plane.scale.x = plane.scale.y = 1.45;

		//init renderer
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		var body = document.querySelector('body');
		body.appendChild(renderer.domElement);

		//POST PROCESSING
		//Create Shader Passes
		renderPass = new THREE.RenderPass(scene, camera);
		badTVPass = new THREE.ShaderPass(THREE.BadTVShader);
		rgbPass = new THREE.ShaderPass(THREE.RGBShiftShader);
		filmPass = new THREE.ShaderPass(THREE.FilmShader);
		staticPass = new THREE.ShaderPass(THREE.StaticShader);
		copyPass = new THREE.ShaderPass(THREE.CopyShader);

		//set shader uniforms
		filmPass.uniforms.grayscale.value = 0;

		//Init DAT GUI control panel
		badTVParams = {
			mute: true,
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
			angle: 0.0
		};

		filmParams = {
			show: true,
			count: 800,
			sIntensity: 0.9,
			nIntensity: 0.4
		};

		onToggleShaders();
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
		setInterval(function () {
			randomizeParams();
		}, 5000);
	}

	function randomizeParams() {

		if (Math.random() < 0.2) {
			badTVParams.distortion = 0.1;
			badTVParams.distortion2 = 0.1;
			badTVParams.speed = 0;
			badTVParams.rollSpeed = 0;
			rgbParams.angle = 0;
			rgbParams.amount = 0;
			staticParams.amount = 0;
		} else {
			badTVParams.distortion = Math.random() * 10 + 0.1;
			badTVParams.distortion2 = Math.random() * 10 + 0.1;
			badTVParams.speed = Math.random() * 0.4;
			badTVParams.rollSpeed = Math.random() * 0.2;
			rgbParams.angle = Math.random() * 2;
			rgbParams.amount = Math.random() * 0.03;
			staticParams.amount = Math.random() * 0.2;
		}
		onParamsChange();
	}

	function applyWavelengths(frequency) {

		frequency *= 0.6;

		if (frequency < 0.20) {
			badTVParams.distortion = randomOffsetRange(0, 0.1);
			badTVParams.distortion2 = randomOffsetRange(0, 0.1);
			badTVParams.speed = 0;
			badTVParams.rollSpeed = 0;
			rgbParams.angle = 0;
			rgbParams.amount = 0;
			staticParams.amount = randomOffsetRange(0.75, 1, 25);
		} else {
			badTVParams.distortion = randomOffsetRange(frequency - 0.05, frequency + 0.15) * 2.5 + 0.1;
			badTVParams.distortion2 = randomOffsetRange(frequency - 0.05, frequency + 0.15) * 2.5 + 0.1;
			badTVParams.speed = randomOffsetRange(frequency - 0.05, frequency + 0.15) * 0.3;
			badTVParams.rollSpeed = randomOffsetRange(frequency - 0.20, frequency - 0.15) * 0.05;
			rgbParams.angle = randomOffsetRange(frequency - 0.05, frequency + 0.15) * 0.025;
			rgbParams.amount = randomOffsetRange(frequency - 0.05, frequency + 0.15) * 0.015;
			staticParams.amount = randomOffsetRange(frequency - 0.05, frequency + 0.15) * 0.35;
		}

		onParamsChange();
	}

	function randomOffsetRange(min, max) {
		return Math.random() * (max - min) + min;
	}

	function importAudio() {
		var ctx = new AudioContext();
		audio.crossOrigin = "anonymous";
		var audioSrc = ctx.createMediaElementSource(audio);
		audioSrc.connect(ctx.destination);
		var analyser = ctx.createAnalyser();
		audioSrc.connect(analyser);
		var frequencyData = new Uint8Array(analyser.frequencyBinCount);

		function renderFrame() {
			var delay = setTimeout(function () {
				requestAnimationFrame(renderFrame);
			}, 200);
			analyser.getByteFrequencyData(frequencyData);
			applyWavelengths(frequencyData[150] / 255);
		}
		audio.paused ? audio.play() : null;

		renderFrame();
	}

	function onToggleShaders() {

		//Add Shader Passes to Composer
		//order is important 
		composer = new THREE.EffectComposer(renderer);
		composer.addPass(renderPass);

		if (filmParams.show) {
			composer.addPass(filmPass);
		}

		if (badTVParams.show) {
			composer.addPass(badTVPass);
		}

		if (rgbParams.show) {
			composer.addPass(rgbPass);
		}

		if (staticParams.show) {
			composer.addPass(staticPass);
		}

		composer.addPass(copyPass);
		copyPass.renderToScreen = true;
	}

	function animate() {
		shaderTime += 0.1;
		badTVPass.uniforms['time'].value = shaderTime;
		filmPass.uniforms['time'].value = shaderTime;
		staticPass.uniforms['time'].value = shaderTime;

		if (video.readyState === video.HAVE_ENOUGH_DATA) {
			if (videoTexture) videoTexture.needsUpdate = true;
		}

		requestAnimationFrame(animate);
		composer.render(0.1);
	}

	function invokeTicketshop() {
		var countdown = setTimeout(function () {
			var iframe = document.querySelector('.iframe-container');
			iframe.classList.add('is-visible');
		}, 3000);
	}

	function onResize() {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}

	initShader();
	invokeTicketshop();
})();