window.onload = function() {
	
	document.getElementById("calculate").addEventListener("click", function(){
		calculate();
	});	
	document.getElementById("reset").addEventListener("click", function(){
		resetValues();
	});	

    $(".js-monster-data-array").select2({
      data: undeadlist,
    });

};

var calculate = function() {

	//input
	var yourlevel = document.getElementById("yourlevel");
	var totalint = document.getElementById("totalint");
	var totalluk = document.getElementById("totalluk");
	var totalmagic = document.getElementById("totalmagic");
	var heallevel = document.getElementById("heallevel");
	var monstername = monsterlist[monster.value].text;
	var monstermdef = eval(monsterlist[monster.value].mdef);
	var monsterlevel = eval(monsterlist[monster.value].level);

	//output
	var avgdmgundead = document.getElementById("avgdmgundead");
	var avgdmgunholy = document.getElementById("avgdmgunholy");
	var mindmgundead = document.getElementById("mindmgundead");
	var mindmgunholy = document.getElementById("mindmgunholy");
	var maxdmgundead = document.getElementById("maxdmgundead");
	var maxdmgunholy = document.getElementById("maxdmgunholy");

	if(!yourlevel.value) {
		yourlevel.style.background = "#FCC";
	}
	else if(!totalint.value) {
		totalint.style.background = "#FCC";
	}
	else if(!totalluk.value) {
		totalluk.style.background = "#FCC";
	}
	else if(!totalmagic.value) {
		totalmagic.style.background = "#FCC";
	}
	else {

		//level diff
		var d = monsterlevel - yourlevel.value;

		if(d < 0){
			d = 0;
		}

		// target multiplier
		var mobamount = [48/48, 38/48, 33/48, 30/48, 28/48];

		mobamount = mobamount[amount.value]

		// min-max-avg dmg 
		var mindmg = ((totalint.value * 1.2 + totalluk.value * 4) * totalmagic.value / 1000 * heallevel.value * mobamount) - monstermdef * 0.6 * (1 + 0.01 * d);
		var maxdmg = ((totalint.value * 4.8 + totalluk.value * 4) * totalmagic.value / 1000 * heallevel.value * mobamount) - monstermdef * 0.5 * (1 + 0.01 * d);
		var avgdmg = (maxdmg + mindmg) / 2;

		// post
		result.innerHTML = "<b>"+ monstername +"</b> is a level <b>"+ monsterlevel +"</b> monster, and has a total of <b>"+ monstermdef +"</b> magical defense (mdef)."

		mindmgundead.value = Math.floor(mindmg);
		maxdmgundead.value = Math.floor(maxdmg);
		avgdmgundead.value = Math.floor(avgdmg);

		mindmgunholy.value = Math.floor(mindmg * 1.5);
		maxdmgunholy.value = Math.floor(maxdmg * 1.5);
		avgdmgunholy.value = Math.floor(avgdmg * 1.5);

		var round = [maxdmgundead.value, maxdmgunholy.value, mindmgundead.value, mindmgunholy.value, avgdmgundead.value, avgdmgunholy.value]

		// max damage
		for(var i = 0; i < round.length; i++) {
			if(round[i] > 99999) {
				round[i] = 99999;
			}
			else {
			}
		}

		// min damage
		for(var i = 0; i < round.length; i++) {
			if(round[i] < 1) {
				round[i] = 1;
			}
			else {
			}
		}

		maxdmgundead.value = round[0];
		maxdmgunholy.value = round[1];
		mindmgundead.value = round[2];
		mindmgunholy.value = round[3];
		avgdmgundead.value = round[4];
		avgdmgunholy.value = round[5];
	}
};

var resetValues = function() {

	// reset input
	totalint.value = 0;
	totalint.style.background = "#EEE";
	totalluk.value = 0;
	totalluk.style.background = "#EEE";
	totalmagic.value = 0;
	totalmagic.style.background = "#EEE";
	heallevel.value = 30;
	amount.value = 1;


	// reset output

	result.innerHTML = "---";
	avgdmgunholy.value = 0;
	avgdmgundead.value = 0;
	mindmgunholy.value = 0;
	mindmgundead.value = 0;
	maxdmgunholy.value = 0;
	maxdmgundead.value = 0;

};
