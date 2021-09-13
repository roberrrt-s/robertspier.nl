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

}

var calculateIt = function() {

	// input
	var level = document.getElementById("level");
	var accuracy = document.getElementById("accuracy");
	var monstername = monsterlist[monster.value].text;
	var monsteravoid = eval(monsterlist[monster.value].avoid);
	var monsterlevel = eval(monsterlist[monster.value].level);

	// output
	var hitrateout = document.getElementById("hitrateout");
	var maxout = document.getElementById("maxout");
	var minout = document.getElementById("minout");

	if(!accuracy.value) {
		accuracy.style.background = "#FCC";
	}
	else if(!level.value) {
		level.style.background = "#FCC";
	}
	else {

		// calculate
		var d = eval(monsterlevel) - eval(level.value);

		if(d < 0){
			d = 0;
		}

		var outcome = eval(accuracy.value) / ((1.84 + 0.07 * d) * monsteravoid) - 1;
		outcome = Math.round(outcome * 100)

		var outcomemin = 0;
		var outcomemax = 0;

		// round
		if(outcome > 100) {
			outcome = 100;
		}
		else if(outcome < 0) {
			outcome = 0;
		}
		else if(isNaN(outcome)) {
			outcome = 0;
		}

		hitrateout.value = outcome;

		// min
		for(var i = 1; outcomemin < 100; i++) {
			outcomemin = i / ((1.84 + 0.07 * d) * monsteravoid) - (1 * 0.05 * (d - 5));
			outcomemin = Math.round(outcomemin * 100);
			var accmin = i;
		}

		// max
		for(var i = 1; outcomemax < 1; i++) {
			outcomemax = i / ((1.84 + 0.07 * d) * monsteravoid) - (1 * 0.05 * (d - 5));
			outcomemax = Math.round(outcomemax * 100);
			var accmax = i;
		}

		maxout.value = accmin;
		minout.value = accmax;

		result.innerHTML = "<b>"+ monstername +"</b> is a level <b>"+ monsterlevel +"</b> monster, and has a total of <b>"+ monsteravoid +"</b> avoidabillity."

	}
};

var resetValues = function() {

	// reset input
	level.value = 0;
	level.style.background = "#EEE"
	accuracy.value = 0;
	accuracy.style.background = "#EEE"

	// reset output
	hitrateout.value = 0;
	maxout.value = 0;
	minout.value = 0;
	result.innerHTML = "---";

};
