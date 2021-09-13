window.onload = function() {
	
	document.getElementById("calculateit").addEventListener("click", function(){
		calculateIt();
	});	
	document.getElementById("resetit").addEventListener("click", function(){
		resetValues();
	});	

    $(".js-monster-data-array").select2({
      data: monsterlist,
    });

};

var calculateIt = function() {

	//input
	var yourlevel = document.getElementById("yourlevel");
	var totalint = document.getElementById("totalint");
	var totalluk = document.getElementById("totalluk");
	var monstername = monsterlist[monster.value].text;
	var monsteravoid = eval(monsterlist[monster.value].avoid);
	var monsterlevel = eval(monsterlist[monster.value].level);

	//output
	var currentout = document.getElementById("currentout");
	var maxout = document.getElementById("maxout");
	var minout = document.getElementById("minout");
	var hitrateout = document.getElementById("hitrateout");

	if(!yourlevel.value) {
		yourlevel.style.background = "#FCC";
	}
	else if(!totalint.value) {
		totalint.style.background = "#FCC";
	}
	else if(!totalluk.value) {
		totalluk.style.background = "#FCC";
	}
	else {

		// calculate
		var d = monsterlevel - yourlevel.value;

		console.log(d)

		if(d < 0){
			d = 0;
		}

		console.log(d)
		totalint = eval(totalint.value);
		totalluk = eval(totalluk.value);

		var current = Math.floor(totalint / 10) + Math.floor(totalluk / 10);
		var max = Math.floor((monsteravoid + 1) * (1 + 0.04 * d));
		var min = Math.floor(0.41 * max);
		var hitrate = -0.7011618132 * Math.pow(((current - min + 1) / (max - min + 1)),2) + 1.702139835 * ((current - min + 1) / (max - min + 1));
		hitrate = Math.round(hitrate * 100);

		if (current < min) {
			hitrate = 0;
		}
		else if (current >= max) { 
			hitrate = 100;
		}
		else {
		}

		console.log(current)
		console.log(max)
		console.log(min)

		result.innerHTML = "<b>"+ monstername +"</b> is a level <b>"+ monsterlevel +"</b> monster, and has a total of <b>"+ monsteravoid +"</b> avoidabillity."
		currentout.value = current;
		maxout.value = max;
		minout.value = min;
		hitrateout.value = hitrate;



	}
};

var resetValues = function() {

	// reset input
	yourlevel.value = 0;
	yourlevel.style.background = "#EEE";
	totalint.value = 0;
	totalint.style.background = "#EEE";
	totalluk.value = 0;
	totalluk.style.background = "#EEE";

	// reset output

	result.innerHTML = "---";
	currentout.value = 0;
	maxout.value = 0;
	minout.value = 0;
	hitrateout.value = 0;

};
