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
	var totalmagic = document.getElementById("totalmagic");
	var totalint = document.getElementById("totalint");
	var skillattack = document.getElementById("skillattack");
	var skillmastery = document.getElementById("skillmastery");
	var elementamp = document.getElementById("elementamp");
	var elemwandbonus = document.getElementById("elemwandbonus");
	var monstername = monsterlist[monster.value].text;
	var monstermdef = eval(monsterlist[monster.value].mdef);
	var monsterlevel = eval(monsterlist[monster.value].level);

	// output
	var avgdmgnormal = document.getElementById("avgdmgnormal");
	var mindmgnormal = document.getElementById("mindmgnormal");
	var maxdmgnormal = document.getElementById("maxdmgnormal");
	var avgdmgweak = document.getElementById("avgdmgweak");
	var mindmgweak = document.getElementById("mindmgweak");
	var maxdmgweak = document.getElementById("maxdmgweak");
	var avgdmgstrong = document.getElementById("avgdmgstrong");
	var mindmgstrong = document.getElementById("mindmgstrong");
	var maxdmgstrong = document.getElementById("maxdmgstrong");

	if(!totalmagic.value) {
		totalmagic.style.background = "#FCC";
	}
	else if(!totalint.value) {
		totalint.style.background = "#FCC";
	}
	else if(!skillattack.value) {
		skillattack.style.background = "#FCC";
	}
	else {

		var d = monsterlevel - yourlevel.value;

		if(d < 0){
			d = 0;
		}

		// max
		var result1 = ((totalmagic.value * totalmagic.value) / 1000);
		result1 += eval(totalmagic.value);
		result1 = result1 / 30;
		var result2 = (totalint.value / 200);
		var maxresult = eval(result1) + eval(result2);

		// min
		var result3 = ((totalmagic.value * totalmagic.value ) / 1000);
		var result4 = (totalmagic.value * skillmastery.value * 0.9);
		result3 += result4;
		result4 = result3 / 30;
		var result5 = (totalint.value / 200);
		var minresult = eval(result4) + eval(result5);

		// post
		maxdmgnormal.value = Math.floor(parseInt((maxresult * skillattack.value * elementamp.value * elemwandbonus.value) - monstermdef * 0.5 * (1 + 0.01 * d)));
		maxdmgweak.value = Math.floor(maxdmgnormal.value / 2);
		maxdmgstrong.value = Math.floor(maxdmgnormal.value * 1.5);

		mindmgnormal.value = Math.floor(parseInt((minresult * skillattack.value * elementamp.value * elemwandbonus.value) - monstermdef * 0.6 * (1 + 0.01 * d)));
		mindmgweak.value = Math.floor(mindmgnormal.value / 2);
		mindmgstrong.value = Math.floor(mindmgnormal.value * 1.5);

		// avg + post
		var result6 = Math.floor(parseInt((eval(maxdmgnormal.value) + eval(mindmgnormal.value)) / 2));
		avgdmgnormal.value = result6;		
		var result7 = Math.floor(avgdmgnormal.value / 2);
		avgdmgweak.value = result7;
		var result8 = Math.floor(avgdmgnormal.value * 1.5);
		avgdmgstrong.value = result8;

		// declare array
		var round = [maxdmgnormal.value, maxdmgweak.value, maxdmgstrong.value, mindmgnormal.value, mindmgweak.value, mindmgstrong.value, avgdmgnormal.value, avgdmgweak.value, avgdmgstrong.value]

		// max damage
		for(var i = 0; i < 9; i++) {
			if(round[i] > 99999) {
				round[i] = 99999;
			}
			else {
			}
		}

		// min damage
		for(var i = 0; i < 10; i++) {
			if(round[i] < 1) {
				round[i] = 1;
			}
			else {
			}
		}

		// final update
		maxdmgnormal.value = round[0];
		maxdmgweak.value = round[1];
		maxdmgstrong.value = round[2];
		mindmgnormal.value = round[3];
		mindmgweak.value = round[4];
		mindmgstrong.value = round[5];
		avgdmgnormal.value = round[6];
		avgdmgweak.value = round[7];
		avgdmgstrong.value = round[8];
		result.innerHTML = "<b>"+ monstername +"</b> is a level <b>"+ monsterlevel +"</b> monster, and has a total of <b>"+ monstermdef +"</b> magical defense (mdef)."

	}
};

var resetValues = function() {

	// reset input
	totalmagic.value = 0;
	totalmagic.style.background = "#EEE";
	totalint.value = 0;
	totalint.style.background = "#EEE";
	skillattack.value = 0;
	skillattack.style.background = "#EEE";
	skillmastery.value = 0.60;
	elementamp.value = 1;
	elemwandbonus.value = 1;

	// reset output
	maxdmgnormal.value = 0;
	maxdmgweak.value = 0;
	maxdmgstrong.value = 0;
	mindmgnormal.value = 0;
	mindmgweak.value = 0;
	mindmgstrong.value = 0;
	avgdmgnormal.value = 0;
	avgdmgweak.value = 0;
	avgdmgstrong.value = 0;
	result.innerHTML = "---";

};
