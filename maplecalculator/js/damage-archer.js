window.onload = function() {
	
	document.getElementById("calculate").addEventListener("click", function(){
		calculate();
	});	
	document.getElementById("reset").addEventListener("click", function(){
		resetValues();
	});	

	// input
	var yourlevel = document.getElementById("yourlevel")
	var minrange = document.getElementById("minrange");
	var maxrange = document.getElementById("maxrange");
	var skilldamage = document.getElementById("skilldamage");
	var skillbonus = document.getElementById("skillbonus");
	var monsterlevel = document.getElementById("monsterlevel");
	var wdef = document.getElementById("wdef");

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

}

var calculate = function() {

	if(!minrange.value) {
		minrange.style.background = "#FCC";
	}
	else if(!maxrange.value) {
		maxrange.style.background = "#FCC";
	}
	else if(!skilldamage.value) {
		skilldamage.style.background = "#FCC";
	}
	else if(!skillbonus.value) {
		skillbonus.style.background = "#FCC";
	}
	else if(!wdef.value) {
		wdef.style.background = "#FCC";
	}
	else {

		minrange = eval(minrange.value);
		maxrange = eval(maxrange.value);
		skilldamage = eval(skilldamage.value / 100);
		skillbonus = eval(skillbonus.value / 100);
		wdef = eval(wdef.value);

		var averagerange = Math.floor((minrange + maxrange) / 2);

		// modify
		minrange = minrange + (minrange * skillbonus);
		maxrange = maxrange + (maxrange * skillbonus);

		// substract wdef
		minrange = minrange * (1 - 0.01) - wdef * 0.5;
		maxrange = maxrange * (1 - 0.01) - wdef * 0.6;

		// apply bonus
		minrange = minrange + Math.floor(minrange * skilldamage);
		maxrange = maxrange + Math.floor(maxrange * skilldamage);

		var avgrange = (minrange + maxrange) / 2;

		mindmgnormal.value = minrange;
		avgdmgnormal.value = avgrange;
		maxdmgnormal.value = maxrange;

		mindmgweak.value = Math.floor(minrange / 2);
		avgdmgweak.value = Math.floor(avgrange / 2);
		maxdmgweak.value = Math.floor(maxrange / 2);

		mindmgstrong.value = Math.floor(minrange * 1.5);
		avgdmgstrong.value = Math.floor(avgrange * 1.5);
		maxdmgstrong.value = Math.floor(maxrange * 1.5);

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
		for(var i = 0; i < 9; i++) {
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

	}
};

var resetValues = function() {

	// reset input
	yourlevel.value = 0;
	yourlevel.style.background = "#EEE";
	minrange.value = 0;
	minrange.style.background = "#EEE";
	maxrange.value = 0;
	maxrange.style.background = "#EEE";
	skilldamage.value = 0;
	skilldamage.style.background = "#EEE";
	skillbonus.value = 0;
	skillbonus.style.background = "#EEE";
	monsterlevel.value = 0;
	monsterlevel.style.background = "#EEE";
	wdef.value = 0;
	wdef.style.background = "#EEE";

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

};
