// Known issues:
// * Brawlers doesn't take into account not having maxed "Improved MaxHP" skill.
// * This calculator is using estimates, but in reality maple uses a lot of random values.
window.onload = function() {	
	// Background data and formulas
	// NOTE: The data is currently using approximations and averages. Thus,
	// the results will not be perfectly accurate.
	
	// 2nd job base HP and MP - Don't think this is actually needed?
	var SPEARMAN_HPMP_LVL30 = {HP: 1600, MP: 325};
	var PAGE_HPMP_LVL30 = {HP: 1600, MP: 325};
	var FIGHTER_HPMP_LVL30 = {HP: 1925, MP: 200};
	var ARCHER_HPMP_LVL30 = {HP: 1100, MP: 625};
	var THIEF_HPMP_LVL30 = {HP: 1100, MP: 625};
	var PIRATE_HPMP_LVL30 = {HP: 1100, MP: 625};
	
	// Job advancement gains
	var SPEARMAN_ADVANCEMENT = {HP: 0, MP: 125};
	var PAGE_ADVANCEMENT = {HP: 0, MP: 125};
	var FIGHTER_ADVANCEMENT = {HP: 325, MP: 0};
	var ARCHER_ADVANCEMENT = {HP: 325, MP: 125};
	var THIEF_ADVANCEMENT = {HP: 325, MP: 125};
	var PIRATE_ADVANCEMENT = {HP: 325, MP: 125};
	
	// Raw level up gains
	// NOTE: The true formula has some randomness in it which is not used here.
	var WARRIOR_LVLUP = {HP: 65.5, MP: 4.5};
	var ARCHER_LVLUP = {HP: 22, MP: 15};
	var THIEF_LVLUP = {HP: 22, MP: 15};
	var GUNSLINGER_LVLUP = {HP: 25, MP: 20};
	// NOTE: This is using the stats after having maxed Brawler's "Improve MaxHP" skill.
	// The results will be inaccurate for a Brawler that does not have this skill maxed.
	var BRAWLER_LVLUP = {HP: 55, MP: 20};
	
	// Raw AP gains (with less than 10 base INT)
	// NOTE: The true formula has some randomness in it which is not used here.
	var WARRIOR_AP = {HP: 51.5, MP: 4};
	var ARCHER_AP = {HP: 18.5, MP: 11.5};
	var THIEF_AP = {HP: 17, MP: 11.5};
	var GUNSLINGER_AP = {HP: 20, MP: 14};
	// NOTE: This is using the stats after having maxed Brawler's "Improve MaxHP" skill.
	// The results will be inaccurate for a Brawler that does not have this skill maxed.
	var BRAWLER_AP = {HP: 40, MP: 14};
	
	// AP reset gains and losses - Don't think anything besides MP loss is needed?
	var WARRIOR_RESET = {HPgain: 20, MPgain: 2, HPloss: 54, MPloss: 4};
	var ARCHER_RESET = {HPgain: 16, MPgain: 10, HPloss: 20, MPloss: 12};
	var THIEF_RESET = {HPgain: 16, MPgain: 10, HPloss: 20, MPloss: 12};
	var PIRATE_RESET = {HPgain: 18, MPgain: 14, HPloss: 42, MPloss: 16};
	
	// Minimum MP formulas
	var SPEARMAN_MP_MIN = function(level) {
		return (level * 4) + 156;
	}
	var FIGHTER_MP_MIN = function(level) {
		return (level * 4) + 56;
	}
	var PAGE_MP_MIN = function(level) {
		return (level * 4) + 56;
	}
	var ARCHER_MP_MIN = function(level) {
		return (level * 14) + 148;
	}
	var THIEF_MP_MIN = function(level) {
		return (level * 14) + 148;
	}
	var PIRATE_MP_MIN = function(level) {
		return (level * 18) + 111;
	}
	
	// Input data
	var job = document.getElementById("class");
	var currenthp = document.getElementById("currenthp");
	var currentmp = document.getElementById("currentmp");
	var currentlevel = document.getElementById("currentlevel");
	var hpgoal = document.getElementById("hpgoal");
	var levelgoal = document.getElementById("levelgoal");
	
	// Output data
	var apintohp = document.getElementById("apintohp");
	var extramp = document.getElementById("extramp");
	var apresets = document.getElementById("apresets");
	var totalmp = document.getElementById("totalmp");
	var baseint = document.getElementById("baseint");
	var intmp = document.getElementById("intmp");

	// Note: No cool stylistic things from me here, just the raw calculations
	var calculate = function() {
		// NOTE: Apparently, you actually do gain hp/mp from 3rd and 4th job
		// advancement, as well as 2nd. This code will need to be updated with that.
		
		// Get the background data for the class selection
		var HPperAP, MPloss, MinMPformula, MPperLevel, AdvancementHP, AdvancementMP;
		switch (job.value) {
			case "Spearman":
				HPperAP = WARRIOR_AP['HP'];
				MPloss = WARRIOR_RESET['MPloss'];
				MinMPformula = SPEARMAN_MP_MIN;
				MPperLevel = WARRIOR_LVLUP['MP'];
				AdvancementHP = SPEARMAN_ADVANCEMENT['HP'];
				AdvancementMP = SPEARMAN_ADVANCEMENT['MP'];
				break;
			case "Fighter":
				HPperAP = WARRIOR_AP['HP'];
				MPloss = WARRIOR_RESET['MPloss'];
				MinMPformula = FIGHTER_MP_MIN;
				MPperLevel = WARRIOR_LVLUP['MP'];
				AdvancementHP = FIGHTER_ADVANCEMENT['HP'];
				AdvancementMP = FIGHTER_ADVANCEMENT['MP'];
				break;
			case "Page":
				HPperAP = WARRIOR_AP['HP'];
				MPloss = WARRIOR_RESET['MPloss'];
				MinMPformula = PAGE_MP_MIN;
				MPperLevel = WARRIOR_LVLUP['MP'];
				AdvancementHP = PAGE_ADVANCEMENT['HP'];
				AdvancementMP = PAGE_ADVANCEMENT['MP'];
				break;
			case "Hunter":
			case "Crossbowman":
				HPperAP = ARCHER_AP['HP'];
				MPloss = ARCHER_RESET['MPloss'];
				MinMPformula = ARCHER_MP_MIN;
				MPperLevel = ARCHER_LVLUP['MP'];
				AdvancementHP = ARCHER_ADVANCEMENT['HP'];
				AdvancementMP = ARCHER_ADVANCEMENT['MP'];
				break;
			case "Assassin":
			case "Bandit":
				HPperAP = THIEF_AP['HP'];
				MPloss = THIEF_RESET['MPloss'];
				MinMPformula = THIEF_MP_MIN;
				MPperLevel = THIEF_LVLUP['MP'];
				AdvancementHP = THIEF_ADVANCEMENT['HP'];
				AdvancementMP = THIEF_ADVANCEMENT['MP'];
				break;
			case "Gunslinger":
				HPperAP = GUNSLINGER_AP['HP'];
				MPloss = PIRATE_RESET['MPloss'];
				MinMPformula = PIRATE_MP_MIN;
				MPperLevel = GUNSLINGER_LVLUP['MP'];
				AdvancementHP = PIRATE_ADVANCEMENT['HP'];
				AdvancementMP = PIRATE_ADVANCEMENT['MP'];
				break;
			case "Brawler":
				HPperAP = BRAWLER_AP['HP'];
				MPloss = PIRATE_RESET['MPloss'];
				MinMPformula = PIRATE_MP_MIN;
				MPperLevel = BRAWLER_LVLUP['MP'];
				AdvancementHP = PIRATE_ADVANCEMENT['HP'];
				AdvancementMP = PIRATE_ADVANCEMENT['MP'];
				break;
			default:
				// Perhaps include Beginner data?
				HPperAP = -1;
				MPloss = -1;
				MinMPformula = -1;
				MPperLevel = -1;
				break;
		}
		
		// Get out if there is an error
		if (HPperAP == -1) {
			return;
		}
		
		// Adjust for how many advancements
		if (levelgoal.value < 70) {
			AdvancementHP = 0;
			AdvancementMP = 0;
		} 
		else if (levelgoal.value < 120) {
			if (currentlevel.value > 70) {
				AdvancementHP = 0;
				AdvancementMP = 0;
			}
		} 
		else {
		if (currentlevel.value > 120) {
				AdvancementHP = 0;
				AdvancementMP = 0;
			} else if (currentlevel.value < 70) {
				AdvancementHP *= 2;
				AdvancementMP *= 2;
			}
		}
		/*
		console.log(AdvancementHP);
		console.log(AdvancementMP);
		console.log(HPperAP);
		console.log(MPloss);
		console.log(MPperLevel);
		*/
		// apintohp
		if (HPperAP != 0) {
			apintohp.value = (hpgoal.value - currenthp.value - AdvancementHP) / HPperAP;		
		}
		
		// apresets
		apresets.value = apintohp.value;
		
		// extramp
		extramp.value = apintohp.value * MPloss;
		
		// totalmp
		totalmp.value = MinMPformula(levelgoal.value) + Number(extramp.value);
		
		// intmp
		intmp.value = totalmp.value - ((levelgoal.value - currentlevel.value) * MPperLevel + AdvancementMP);
		
		// baseint
		baseint.value = (intmp.value / (levelgoal.value - currentlevel.value)) * 10;
	};

	var resetValues = function() {
		job.value = "Spearman";
		currenthp.value = 0;
		currentmp.value = 0;
		currentlevel.value = 30;
		hpgoal.value = 0;
		levelgoal.value = 30;
		
		apintohp.value = 0;
		extramp.value = 0;
		apresets.value = 0;
		totalmp.value = 0;
		baseint.value = 0;
		intmp.value = 0;
	};
	
	// Event listeners
	document.getElementById("calculate").addEventListener("click", calculate);
	document.getElementById("reset").addEventListener("click", resetValues);
}