TweenMax.set('#scherm3', {
	opacity: 0
})

TweenMax.set('#scherm2', {
	opacity: 0
})

TweenMax.set('#scherm4', {
	opacity: 0,
	x:500
})

TweenMax.set('.items', {
	opacity: 0
})

TweenMax.set('#info1', {
	opacity: 0,
	y: 600
})

TweenMax.set('#info2', {
	opacity: 0,
	y: 600
})

TweenMax.set('#info3', {
	opacity: 0,
	y: 600
})

TweenMax.set('#info4', {
	opacity: 0,
	y: 600
})

// Timeline

	var tl = new TimelineMax();

	tl.to('#status', 2, {
		width: "100%",
		delay: 5
	})

	tl.to('#scherm2', 1, {
		opacity: 1,
		delay: 0.1
	})

	tl.from('#info', 1, {
		y: -300,
		ease:Bounce.easeOut
	}, "-=0.6")

	tl.to('#scherm1', 1, {
		opacity: 0
	})

	tl.to('#scherm2', 1, {
		opacity: 0,
		delay: 0.5
	})

	tl.to('#scherm3', 1, {
		opacity: 1,
		delay: -1
	})

	tl.from('.header', 0.3,{
		y: -70
	})

	tl.staggerFrom('.icon img', 1, {
		y: 400,
		opacity: 0,
		ease: Bounce.easeIn
	}, 0.2)

	tl.staggerFrom('.icon p', 1, {
		y: 400,
		opacity: 0,
		ease: Bounce.easeOut
	}, 0.2, "-=1.2")

// jQuery

function replace() {
	$('#icon1').replaceWith('<img src="img/icons/gedrag.gif" id="icon1">')
	$('#icon2').replaceWith('<img src="img/icons/anatomie.gif" id="icon2">')
	$('#icon3').replaceWith('<img src="img/icons/leefgebied.gif" id="icon3">')
	$('#icon4').replaceWith('<img src="img/icons/geluid.gif" id="icon4">')
}

setTimeout(replace, 13000);

//icons click

$('.icon:nth-of-type(2)').on('click', function() {
	var tl = new TimelineMax( { onComplete: replaceImage } );

	tl.to('.icon:nth-of-type(2)', 1, {
		scale: 1.1,
		x: -85,
		rotation: 360,
		transformOrigin: "50% 50%",
		y: 100
	})

	tl.to('.icongo', 0.2, {
		opacity: 0
	}, "-=0.8")

	tl.to('.icon:nth-of-type(2)', 0.3, {
		opacity: 0
	}, "+=0.5")

	tl.to('.header', 0.5, {
		opacity: 0
	}, "-=0.1")

	tl.to('#scherm4', 0.3, {
		opacity: 1,
		x: 0
	}, "-=0.5")

	tl.to('.header', 0.5, {
		y: 0,
		opacity: 1
	}, "-=0.2")

	tl.staggerTo('.items', 0.6, {
		opacity: 1
	}, 0.3, "-=0.4")


	setTimeout($('#svg').replaceWith('<img src="img/falling-once.gif" id="svg">'), 0);

	tl.from('#svgcontainer', 2, {
		top: "-50px"
	}, "-=0.3")

	// Z-index
	$('#scherm4').css({
		zIndex: 2
	})

	$('#scherm3').css({
		zIndex: 1
	})
})

var replaceImage = function() {
	$('#svg').replaceWith('<img src="img/moving-cat.gif" id="svg">')
}

//anatomie clicks
$('#tail').on('click', function() {

	var tl = new TimelineMax();

	tl.to('#scherm4 .header', 0.5, {
		y: -70
	})

	tl.to('#info3', 0.7, {
		opacity: 1,
		y: 0
	}, "-=0.5")

	tl.from('#info3 img', 0.7, {
		y:600,
		opacity: 1
	}, "-=2")

	tl.from('#info3 .header', 0.7, {
		y: -670
	}, "-=0.7")

	// Z-index
	$('#info3').css({
		zIndex: 2
	})

	$('#scherm4').css({
		zIndex: 0
	})

	$('#scherm3').css({
		zIndex: 0
	})
})

$('#ears').on('click', function() {
	var tl = new TimelineMax();

	tl.to('#scherm4 .header', 0.5, {
		y: -70
	})

	tl.to('#info1', 0.7, {
		opacity: 1,
		y: 0
	}, "-=0.5")

	tl.from('#info1 img', 0.7, {
		y: 600,
		opacity: 1
	}, "-=2")

	tl.from('#info1 .header', 0.7, {
		y: -670
	}, "-=0.7")

	// Z-index
	$('#info1 .header').css({
		zIndex: 2
	})

	$('#info1 img').css({
		zIndex: 2
	})

	$('#info1').css({
		zIndex: 2
	})

	$('#scherm4').css({
		zIndex: 0
	})

	$('#scherm3').css({
		zIndex: 0
	})
})

$('#nose').on('click', function() {
	var tl = new TimelineMax();

	tl.to('#scherm4 .header', 0.5, {
		y: -70
	})

	tl.to('#info2', 0.7, {
		opacity: 1,
		y: 0
	}, "-=0.5")

	tl.from('#info2 img', 0.7, {
		y:600,
		opacity: 1
	}, "-=2")

	tl.from('#info2 .header', 0.7, {
		y: -670
	}, "-=0.7")

	// Z-index
	
	$('#info2').css({
		zIndex: 2
	})

	$('#scherm4').css({
		zIndex: 0
	})

	$('#scherm3').css({
		zIndex: 0
	})
})

$('#eyes').on('click', function() {
	var tl = new TimelineMax();

	tl.to('#scherm4 .header', 0.5, {
		y: -70
	})

	tl.to('#info4', 0.7, {
		opacity: 1,
		y: 0
	}, "-=0.5")

	tl.from('#info4 img', 0.7, {
		y:600,
		opacity: 1
	}, "-=2")

	tl.from('#info4 .header', 0.7, {
		y: -670
	}, "-=0.7")

	// Z-index
	$('#info4').css({
		zIndex: 2
	})

	$('#scherm4').css({
		zIndex: 0
	})

	$('#scherm3').css({
		zIndex: 0
	})
})

$('.info').on('click', function() {
	TweenMax.to('#scherm4 .header', 0.5, {
		y:0,
		delay: 0.4
	})

	TweenMax.to(this, 1, {
		y: 600,
		opacity: 0
	})
})

$('#back').on('click', function() {
	var tl = new TimelineMax();

	tl.set('.icon:nth-of-type(2)', {
		scale: 1,
		y: 0,
		x: 0
	})


	tl.to('.header', 0.5, {
		y: -70
	})

	tl.to('#scherm4', 0.3, {
		opacity: 0,
		x: 300
	}, "-=0.2")

	tl.to('.icon', 0.4, {
		x: 1,
		opacity: 1
	}, "-=0.2")	

	tl.to('.header', 0.5, {
		y: 0
	}, "-=0.3")


	// Z-index
	$('#scherm4').css({
		zIndex: 1
	})

	$('#scherm3').css({
		zIndex: 2
	})
})