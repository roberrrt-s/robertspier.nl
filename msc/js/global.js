/*	
	- Ultimate MapleStory Calculator (v62) -
	- Written and designed by Robert Spier -
*/

window.onload = function() {

	// Button configuration

	$("#calculatevalues").click(function() {
		calculateIt();
	});

	$("#resetvalues").click(function() {
		resetAll();
	});	

	// Select2 configuration

    $(".monsterdata-list").select2({
      data: monsterlist,
    });

    $(".undeadlist-list").select2({
      data: undeadlist,
    });

	$(".jobselect-data").select2({
	  minimumResultsForSearch: Infinity,
	  placeholder: "Choose"
	});

	$(".skillmastery").select2({
	  minimumResultsForSearch: Infinity
	});

	$(".elementamp").select2({
	  minimumResultsForSearch: Infinity
	});

	$(".elemwandbonus").select2({
	  minimumResultsForSearch: Infinity
	});

	$(".damagetype-data").select2({
	  minimumResultsForSearch: Infinity
	});

	$(".heallevel").select2({
	  minimumResultsForSearch: Infinity
	});

	$(".monsteramount").select2({
	  minimumResultsForSearch: Infinity
	});
	$(".hpclass-data").select2({
	  minimumResultsForSearch: Infinity
	});
	$(".dataset").select2({
	  minimumResultsForSearch: Infinity
	});

};

hideAll();

// Filter based on jobselection

$("#jobselect").change(function() {
    
    var job = $("#jobselect").val();

	switch (job) {
		case "1": // warrior
   			hideAll();
   			$("#stats").show();
   			$(".str").show();
   			$(".dex").show();
   			$(".acc").show();
			$(".minrange").show();
			$(".maxrange").show();
   			$("#monsterselect").show();
   			$(".damagetype").show();
	    break;

	  	case "2": // bowman
   			hideAll();
   			$("#stats").show();
   			$(".str").show();
   			$(".dex").show();
   			$(".acc").show();
			$(".minrange").show();
			$(".maxrange").show();
   			$("#archerskills").show();
   			$("#monsterselect").show();
   			$(".damagetype").show();
	    break;

	  	case "3": // thief
   			hideAll();
   			$("#stats").show();
   			$(".luk").show();
   			$(".dex").show();
   			$(".str").show();
   			$(".acc").show();
			$(".minrange").show();
			$(".maxrange").show ();
   			$(".damagetype").show();
   			$("#monsterselect").show();
	    break;

	  	case "4": // pirate
   			hideAll();
   			$("#stats").show();
   			$(".str").show();
   			$(".dex").show();
   			$(".acc").show();
			$(".minrange").show();
			$(".maxrange").show();
   			$("#monsterselect").show();
   			$(".damagetype").show();
	    break;

	  	case "5": // magician
   			hideAll();
   			$("#stats").show();
   			$(".int").show();
   			$(".luk").show();
   			$(".totalmagic").show();
   			$("#magicianskills").show();
   			$("#monsterselect").show();
   			$(".damagetype").show();
	    break;

	  	case "6": // heal
   			hideAll();
   			$("#stats").show();
   			$(".int").show();
   			$(".luk").show();
   			$(".totalmagic").show();
   			$("#healskills").show();
	    break;

	  	case "9": // hp wash
   			hideAll();
   			$("#stats").show();
   			$(".hp").show();
   			$(".mp").show();
   			$(".hpclass").show();
   			$("#hptarget").show();
	    break;

	  	default:
	  		hideAll();

	}

});

// Calculate function

var multiply, maxdmg, mindmg, avgdmg, elemwandbonus, elementamp, skillmastery, skillattack, acc, totalmagic, totalint, totalluk, totalstr, totaldex, fire, ice, poison, holy, lightning;

function calculateIt() {

	resetAll();

	var job = parseInt($("#jobselect").val());
	var def;
	var damagetype = parseInt($("#damagetype").val());

	var m = parseInt($("#monster").val());
	var d = parseInt(monsterlist[m].level) - parseInt($("#level").val());

	if(d < 0){
		d = 0;
	}

	if(job === 0) {
		console.log('nope');
	}

	else if(job === 1) {

		$("#results").show();

		def = monsterlist[m].wdef + "</b> weapon defense";
		$(".currentaccuracy").hide();

		// WARRIOR (GLOBAL DECLARE)

		acc = parseInt($("#acc").val());

		// DAMAGE

		// ACCURACY

		globalAccuracy(d, acc, m);

		$('#monsterdata').html("<b>" + monsterlist[m].text +"</b> is a level <b>"+ monsterlist[m].level +"</b> monster with <b>" + monsterlist[m].hp + "</b> HP. It has <b>" + def + " and  <b>"+ monsterlist[m].avoid +"</b> avoidabillity.");

	}
	else if(job === 2) {

		$("#results").show();

		def = monsterlist[m].wdef + "</b> weapon defense";
		$(".currentaccuracy").hide();

		// ARCHER (GLOBAL DECLARE)

		acc = parseInt($("#acc").val());

		// DAMAGE

		// ACCURACY

		globalAccuracy(d, acc, m);

		$('#monsterdata').html("<b>" + monsterlist[m].text +"</b> is a level <b>"+ monsterlist[m].level +"</b> monster with <b>" + monsterlist[m].hp + "</b> HP. It has <b>" + def + " and  <b>"+ monsterlist[m].avoid +"</b> avoidabillity.");

	}
	else if(job === 3) {

		$("#results").show();

		def = monsterlist[m].wdef + "</b> weapon defense";
		$(".currentaccuracy").hide();

		// THIEF (GLOBAL DECLARE)

		acc = parseInt($("#acc").val());

		// DAMAGE

		// ACCURACY

		globalAccuracy(d, acc, m);

		$('#monsterdata').html("<b>" + monsterlist[m].text +"</b> is a level <b>"+ monsterlist[m].level +"</b> monster with <b>" + monsterlist[m].hp + "</b> HP. It has <b>" + def + " and  <b>"+ monsterlist[m].avoid +"</b> avoidabillity.");

	}
	else if(job === 4) {

		$("#results").show();

		def = monsterlist[m].wdef + "</b> weapon defense";
		$(".currentaccuracy").hide();

		// PIRATE (GLOBAL DECLARE)

		acc = parseInt($("#acc").val());

		// DAMAGE

		// ACCURACY

		globalAccuracy(d, acc, m);

		$('#monsterdata').html("<b>" + monsterlist[m].text +"</b> is a level <b>"+ monsterlist[m].level +"</b> monster with <b>" + monsterlist[m].hp + "</b> HP. It has <b>" + def + " and  <b>"+ monsterlist[m].avoid +"</b> avoidabillity.");

	}
	else if(job === 5) {

		$("#results").show();

		def = monsterlist[m].mdef + "</b> magic defense";

		//  MAGICIAN (GLOBAL DECLARE)

		totalint = parseInt($("#int").val());
		totalluk = parseInt($("#luk").val());
		totalmagic = parseInt($("#totalmagic").val());
		skillattack = parseInt($("#skillattack").val());
		skillmastery = eval($("#skillmastery option:selected").val());
		elementamp = eval($("#elementamp option:selected").val());
		elemwandbonus = eval($("#elemwandbonus option:selected").val());

		//	DAMAGE

		// max
		var result1 = ((totalmagic * totalmagic) / 1000);
		result1 += totalmagic;
		result1 = result1 / 30;
		var result2 = (totalint / 200);
		var maxresult = eval(result1) + eval(result2);

		// min
		var result3 = ((totalmagic * totalmagic ) / 1000);
		var result4 = (totalmagic * skillmastery * 0.9);
		result3 += result4;
		result4 = result3 / 30;
		var result5 = (totalint / 200);
		var minresult = eval(result4) + eval(result5);

		// minmax
		maxdmg = Math.floor(parseInt(maxresult * skillattack * elementamp * elemwandbonus));
		mindmg = Math.floor(parseInt(minresult * skillattack * elementamp * elemwandbonus));

		// elemental multiplier

		checkWeakness(damagetype, m);

		// def reduxx + avg
		maxdmg = (maxdmg - monsterlist[m].mdef * 0.5 * (1 + 0.01 * d))
		mindmg = (mindmg - monsterlist[m].mdef * 0.6 * (1 + 0.01 * d))

		avgdmg = Math.floor(parseInt((eval(maxdmg) + eval(mindmg)) / 2));

		// declare array
		var roundmatk = [mindmg, maxdmg, avgdmg]

		// max damage
		for(var i = 0; i < 3; i++) {
			if(roundmatk[i] > 99999) {
				roundmatk[i] = 99999;
			}
			else {
			}
		}

		// min damage
		for(var i = 0; i < 3; i++) {
			if(roundmatk[i] < 1) {
				roundmatk[i] = 1;
			}
			else {
			}
		}

		$("#mindmg").html(Math.floor(roundmatk[0]));
		$("#maxdmg").html(Math.floor(roundmatk[1]));
		$("#avgdmg").html(Math.floor(roundmatk[2]));

		//	ACCURACY

		magicAccuracy(totalint, totalluk, m, d);

		$('#monsterdata').html("<b>" + monsterlist[m].text +"</b> is a level <b>"+ monsterlist[m].level +"</b> monster with <b>" + monsterlist[m].hp + "</b> HP. It has <b>" + def + " and  <b>"+ monsterlist[m].avoid +"</b> avoidabillity.");

	}
	else if(job === 6) {

		$("#results").show();

		// RESET BECAUSE UNDEAD ONLY

		damagetype = 4;

		var m = parseInt($("#unmonster").val());
		var d = parseInt(monsterlist[m].level) - parseInt($("#level").val());

		if(d < 0){
			d = 0;
		}

		def = monsterlist[m].mdef + "</b> magic defense";

		//  MAGICIAN HEAL (GLOBAL DECLARE)

		totalint = parseInt($("#int").val());
		totalluk = parseInt($("#luk").val());
		totalmagic = parseInt($("#totalmagic").val());

		heallevel = eval($("#heallevel option:selected").val());
		monsteramount = eval($("#monsteramount option:selected").val());

		// DAMAGE

		var mobamount = [48/48, 38/48, 33/48, 30/48, 28/48];

		mobamount = mobamount[monsteramount]

		// min-max-avg dmg 
		var mindmg = ((totalint * 1.2 + totalluk * 4) * totalmagic / 1000 * heallevel * mobamount);
		var maxdmg = ((totalint * 4.8 + totalluk * 4) * totalmagic / 1000 * heallevel * mobamount);

		checkWeakness(damagetype, m);

		// def reduxx + avg
		maxdmg = (maxdmg - monsterlist[m].mdef * 0.5 * (1 + 0.01 * d))
		mindmg = (mindmg - monsterlist[m].mdef * 0.6 * (1 + 0.01 * d))

		avgdmg = Math.floor(parseInt((eval(maxdmg) + eval(mindmg)) / 2));

		// declare array
		var roundmatk = [mindmg, maxdmg, avgdmg]

		// max damage
		for(var i = 0; i < 3; i++) {
			if(roundmatk[i] > 99999) {
				roundmatk[i] = 99999;
			}
			else {
			}
		}

		// min damage
		for(var i = 0; i < 3; i++) {
			if(roundmatk[i] < 1) {
				roundmatk[i] = 1;
			}
			else {
			}
		}

		$("#mindmg").html(Math.floor(roundmatk[0]));
		$("#maxdmg").html(Math.floor(roundmatk[1]));
		$("#avgdmg").html(Math.floor(roundmatk[2]));

		// ACCURACY

		magicAccuracy(totalint, totalluk, m, d);

		$('#monsterdata').html("<b>" + monsterlist[m].text +"</b> is a level <b>"+ monsterlist[m].level +"</b> monster with <b>" + monsterlist[m].hp + "</b> HP. It has <b>" + def + " and  <b>"+ monsterlist[m].avoid +"</b> avoidabillity.");
	}
	else if(job === 9) {

		$("#hpresults").show();

		// HP WASH (GLOBAL DECLARE)

		var currentlevel = parseInt($("#level").val());

		if(currentlevel < 30) {
			$(".30advice").show()
		}
		else {

			$(".30advice").hide();

			var dataset = parseInt($("#dataset").val());
			var currenthp = parseInt($("#hp").val());
			var currentmp = parseInt($("#mp").val());
			var m = parseInt($("#hpclass").val());

			var targethp = parseInt($("#targethp").val());
			var targetlevel = parseInt($("#targetlevel").val());

			var minmp = function(level, multiplier, addition) {
				return (level * multiplier) + addition;
			}

			console.log(dataset);

			// Measurement pick

			var hpdata, mpdata
			switch (dataset) {
				case 0:
					hpdata = 'minhp';
					mpdata = 'minmp';
					break;
				case 1:
					hpdata = 'hp';
					mpdata = 'mp';
					break;
				case 2:
					hpdata = 'maxhp';
					mpdata = 'maxmp';
					break;
				default:
					hpdata = 'hp';
					mpdata = 'mp';
					break;
			}

			var hpperap = parseInt(hpwashdata[m]['rawap' + hpdata]);
			var mploss = parseInt(hpwashdata[m]['mploss']);
			var hpperlevel = parseInt(hpwashdata[m]['rawlevel' + hpdata]);
			var mpperlevel = parseInt(hpwashdata[m]['rawlevel' + mpdata]);
			var advancementhp = parseInt(hpwashdata[m]['adv' + hpdata]);
			var advancementmp = parseInt(hpwashdata[m]['adv' + mpdata]);

			console.log(mpperlevel);

			// Adjust for how many advancements
			if (targetlevel < 70) {
				advancementhp = 0;
				advancementmp = 0;
			} 
			else if (targetlevel < 120) {
				if (currentlevel > 70) {
					advancementhp = 0;
					advancementmp = 0;
				}
			} 
			else {
				if (currentlevel > 120) {
					advancementhp = 0;
					advancementmp = 0;
				} 
				else if (currentlevel < 70) {
					advancementhp *= 2;
					advancementmp *= 2;
				}
			}

			// apintohp
			var requiredap = Math.ceil((targethp - currenthp - advancementhp - ((targetlevel - currentlevel) * hpperlevel)) / hpperap);		
			
			// current base mp
			var currentminmp = minmp(currentlevel, hpwashdata[m].multi, hpwashdata[m].add) + advancementmp;

			// current base mp
			var farmedmp = currentmp - currentminmp;

			// apresets
			var requiredresets = requiredap;
			
			// extramp
			var requiredmp = requiredap * mploss;
			
			// totalmp
			var requiredtotalmp = minmp(targetlevel, hpwashdata[m].multi, hpwashdata[m].add) + requiredmp;
			
			// intmp

			console.log(requiredtotalmp)
			console.log(targetlevel)
			console.log(currentlevel)
			console.log(mpperlevel)
			console.log(advancementmp)
			console.log(currentmp)

			var requiredgain = requiredtotalmp - ((targetlevel - currentlevel) * mpperlevel + advancementmp + currentmp);

			// baseint
			var requiredint = (requiredgain / (targetlevel - currentlevel)) * 10;

			if(requiredint > 99) {
				requiredint = Math.ceil(requiredint / 100);
				requiredint *= 100;
			}
			else if(requiredint > 9 && requiredint < 100) {
				requiredint = Math.ceil(requiredint / 10);
				requiredint *= 10;
			}

			if(requiredgain < 0) {
				requiredgain = "You do not require any more MP to reach this HP";
			}
			if(requiredint < 0) {
				requiredint = "You do not require any more INT to reach this HP";
			}

			// HP WASH (GLOBAL OUTPUT)

			console.log("i live")

			$("#currentminmp").html(currentminmp);
			$("#farmedmp").html(farmedmp);
			$("#requiredap").html(requiredap);
			$("#requiredresets").html(requiredresets);
			$("#requiredint").html(requiredint);
			$("#requiredmp").html(requiredmp);
			$("#requiredtotalmp").html(requiredtotalmp);
			$("#requiredgain").html(requiredgain);
		}
	}
	// ADVICE
 	if(job !== 9){
		generateAdvice(mindmg, avgdmg, m);
	}
	else {
		generateHpWashing();
	}
}

// Magic accuracy

function magicAccuracy(totalint, totalluk, m, d) {

	var currentaccuracy = Math.floor(totalint / 10) + Math.floor(totalluk / 10);
	var maxaccuracy = Math.floor((monsterlist[m].avoid + 1) * (1 + 0.04 * d));
	var minaccuracy = Math.floor(0.41 * maxaccuracy);
	var hitratio = -0.7011618132 * Math.pow(((currentaccuracy - minaccuracy + 1) / (maxaccuracy - minaccuracy + 1)),2) + 1.702139835 * ((currentaccuracy - minaccuracy + 1) / (maxaccuracy - minaccuracy + 1));
	hitratio = Math.round(hitratio * 100);

	if (currentaccuracy < minaccuracy) {
		hitratio = 0;
	}
	else if (currentaccuracy >= maxaccuracy) { 
		hitratio = 100;
	}
	else {
	}

	$("#currentaccuracy").html(currentaccuracy);
	$("#maxaccuracy").html(maxaccuracy);
	$("#minaccuracy").html(minaccuracy);
	$("#hitratio").html(hitratio);
}

// Normal accuracy

function globalAccuracy(d, acc, m) {

	var hitratio = acc / ((1.84 + 0.07 * d) * monsterlist[m].avoid) - 1;
	hitratio = Math.round(hitratio * 100);

	var outcomemin = 0;
	var outcomemax = 0;

	// round
	if(hitratio > 100) {
		hitratio = 100;
	}
	else if(hitratio < 0) {
		hitratio = 0;
	}
	else if(isNaN(hitratio)) {
		hitratio = 0;
	}


	// min
	for(var i = 1; outcomemin < 100; i++) {
		outcomemin = i / ((1.84 + 0.07 * d) * monsterlist[m].avoid) - (1 * 0.05 * (d - 5));
		outcomemin = Math.round(outcomemin * 100);
		var maxaccuracy = i;
	}

	// max
	for(var i = 1; outcomemax < 1; i++) {
		outcomemax = i / ((1.84 + 0.07 * d) * monsterlist[m].avoid) - (1 * 0.05 * (d - 5));
		outcomemax = Math.round(outcomemax * 100);
		var minaccuracy = i;
	}

	$("#maxaccuracy").html(maxaccuracy);
	$("#minaccuracy").html(minaccuracy);
	$("#hitratio").html(hitratio);
}

// Checking for the monsters elemental status

function checkWeakness(damagetype, m) {

	// fire

    if(monsterlist[m].elem.indexOf("F3") !== -1) {
    	fire = "Weak";
    }
    else if(monsterlist[m].elem.indexOf("F2") !== -1) {
    	fire = "Strong";
    }
    else if(monsterlist[m].elem.indexOf("F1") !== -1) {
    	fire = "Immume";
    }
    else {
    	fire = "None";
    }

    $("#firevalue").html(fire);

    // ice

    if(monsterlist[m].elem.indexOf("I3") !== -1) {
    	ice = "Weak";
    }
    else if(monsterlist[m].elem.indexOf("I2") !== -1) {
    	ice = "Strong";
    }
    else if(monsterlist[m].elem.indexOf("I1") !== -1) {
    	ice = "Immume";
    }
    else {
    	ice = "None";
    }

    $("#icevalue").html(ice);

    // poison

    if(monsterlist[m].elem.indexOf("S3") !== -1) {
    	poison = "Weak";
    }
    else if(monsterlist[m].elem.indexOf("S2") !== -1) {
    	poison = "Strong";
    }
    else if(monsterlist[m].elem.indexOf("S1") !== -1) {
    	poison = "Immume";
    }
    else {
    	poison = "None";
    }

    $("#poisonvalue").html(poison);

	// holy

    if(monsterlist[m].elem.indexOf("H3") !== -1) {
    	holy = "Weak";
    }
    else if(monsterlist[m].elem.indexOf("H2") !== -1) {
    	holy = "Strong";
    }
    else if(monsterlist[m].elem.indexOf("H1") !== -1) {
    	holy = "Immume";
    }
    else {
    	holy = "None";
    }

    $("#holyvalue").html(holy);

    // lightning

    if(monsterlist[m].elem.indexOf("L3") !== -1) {
    	lightning = "Weak";
    }
    else if(monsterlist[m].elem.indexOf("L2") !== -1) {
    	lightning = "Strong";
    }
    else if(monsterlist[m].elem.indexOf("L1") !== -1) {
    	lightning = "Immume";
    }
    else {
    	lightning = "None";
    }

    $("#lightningvalue").html(lightning);

	if(damagetype !== 0) {

		if(damagetype == 1) {
			switch (fire) {
				case "Weak": 
					$("#elembonusdamage").html("This monster is weak versus your <b>fire</b> attack (150% damage)");
					maxdmg *= 1.5;
					mindmg *= 1.5;
			    break;

			    case "Strong":
					$("#elembonusdamage").html("This monster is strong versus your <b>fire</b> attack (50% damage)");
					maxdmg /= 2;
					mindmg /= 2;
			    break;

			    case "Immume":
					$("#elembonusdamage").html("This monster is immume versus your <b>fire</b> attack (1 damage only)");
					maxdmg = 1;
					mindmg = 1;
			    break;

			    default:
					$("#elembonusdamage").html("This monster has nothing special versus your <b>fire</b> attack (100% damage)");
			}
		}
		else if(damagetype == 2) {
			switch (ice) {
				case "Weak": 
					$("#elembonusdamage").html("This monster is weak versus your <b>ice</b> attack (150% damage)");
					maxdmg *= 1.5;
					mindmg *= 1.5;
			    break;

			    case "Strong":
					$("#elembonusdamage").html("This monster is strong versus your <b>ice</b> attack (50% damage)");
					maxdmg /= 2;
					mindmg /= 2;
			    break;

			    case "Immume":
					$("#elembonusdamage").html("This monster is immume versus your <b>ice</b> attack (1 damage only)");
					maxdmg = 1;
					mindmg = 1;
			    break;

			    default:
					$("#elembonusdamage").html("This monster has nothing special versus your <b>ice</b> attack (100% damage)");
			}
		}
		else if(damagetype == 3) {
			switch (poison) {
				case "Weak": 
					$("#elembonusdamage").html("This monster is weak versus your <b>poison</b> attack (150% damage)");
					maxdmg *= 1.5;
					mindmg *= 1.5;
			    break;

			    case "Strong":
					$("#elembonusdamage").html("This monster is strong versus your <b>poison</b> attack (50% damage)");
					maxdmg /= 2;
					mindmg /= 2;
			    break;

			    case "Immume":
					$("#elembonusdamage").html("This monster is immume versus your <b>poison</b> attack (1 damage only)");
					maxdmg = 1;
					mindmg = 1;
			    break;

			    default:
					$("#elembonusdamage").html("This monster has nothing special versus your <b>poison</b> attack (100% damage)");
			}
		}
		else if(damagetype == 4) {
			switch (holy) {
				case "Weak": 
					$("#elembonusdamage").html("This monster is weak versus your <b>holy</b> attack (150% damage)");
					maxdmg *= 1.5;
					mindmg *= 1.5;
			    break;

			    case "Strong":
					$("#elembonusdamage").html("This monster is strong versus your <b>holy</b> attack (50% damage)");
					maxdmg /= 2;
					mindmg /= 2;
			    break;

			    case "Immume":
					$("#elembonusdamage").html("This monster is immume versus your <b>holy</b> attack (1 damage only)");
					maxdmg = 1;
					mindmg = 1;
			    break;

			    default:
					$("#elembonusdamage").html("This monster has nothing special versus your <b>holy</b> attack (100% damage)");
			}
		}
		else if(damagetype == 5) {
			switch (lightning) {
				case "Weak": 
					$("#elembonusdamage").html("This monster is weak versus your <b>lightning</b> attack (150% damage)");
					maxdmg *= 1.5;
					mindmg *= 1.5;
			    break;

			    case "Strong":
					$("#elembonusdamage").html("This monster is strong versus your <b>lightning</b> attack (50% damage)");
					maxdmg /= 2;
					mindmg /= 2;
			    break;

			    case "Immume":
					$("#elembonusdamage").html("This monster is immume versus your <b>lightning</b> attack (1 damage only)");
					maxdmg = 1;
					mindmg = 1;
			    break;

			    default:
					$("#elembonusdamage").html("This monster has nothing special versus your <b>lightning</b> attack (100% damage)");
			}
		}
	}
	else {
		$("#elembonusdamage").html("You are not applying any elemental damage");
	}
}

// Generating advice

function generateAdvice(mindmg, avgdmg, m) {

	var hitamount, hitamount2;

	if(m === 0) {
		$("#adviceuser").html("<center>nope nope nope nope nope nope nope nope nope nope nope nope nope nope nope nope nope nope nope nope</center><br><br>").append("<center><img alt='nope' style='width:250px; height:240px;' src='http://i.imgur.com/9IsB2Ka.gif'/></center>");

	}
	else {
		if(mindmg < 2) {
			hitamount = monsterlist[m].hp;
			hitamount2 = monsterlist[m].hp;
		}
		else {
			hitamount = Math.ceil(monsterlist[m].hp / mindmg);
			hitamount2 = Math.ceil(monsterlist[m].hp / avgdmg);
		}

		$("#adviceuser").html("You need to hit this monster at least <b>" + hitamount + "</b> time(s) to kill it. (using your minimal damage per hit)<br>However, you probably have to hit it <b>" + hitamount2 + "</b> time(s) to kill it. (using your average damage per hit)");
	}
 }

// Generating HP washing advice

function generateHpWashing() {
	console.log("skipped the advice")
}

// Hide/reset function

function hideAll() {

	$("#stats").hide();
	$("#hptarget").hide();
	$("#monsterselect").hide();
	$("#magicianskills").hide();
	$("#archerskills").hide();
	$("#healskills").hide();
	$("#results").hide();
	$("#hpresults").hide();
	$(".hp").hide();
	$(".mp").hide();
	$(".hpclass").hide();
	$(".int").hide();
	$(".luk").hide();
	$(".str").hide();
	$(".dex").hide();
	$(".acc").hide();
	$(".minrange").hide();
	$(".maxrange").hide();
	$(".totalmagic").hide();
	$(".currentaccuracy").show();
	$(".damagetype").hide();
	$(".damagetype-data").hide();
}

function resetAll() {

	// results
	var def = undefined;
	$("#monsterdata").html("");
	$("#firevalue").html("-");
	$("#icevalue").html("-");
	$("#poisonvalue").html("-");
	$("#holyvalue").html("-");
	$("#lightningvalue").html("-");
	$("#elembonusdamage").html("");
	$("#mindmg").html("-");
	$("#avgdmg").html("-");
	$("#maxdmg").html("-");
	$("#currentaccuracy").html("-");
	$("#maxaccuracy").html("-");
	$("#minaccuracy").html("-");
	$("#hitratio").html("-");
	$("#adviceuser").html("-")

	// input
}