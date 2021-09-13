// Russian Roulette by Robert Spier
// Version 1.0.2 - 500682745
// 
// Release 1.0 
// - Basic roulette game 
//
// Update 1.0.1
//  - Added multiple document.write to clarify actions without opening console
//
// Update 1.0.2
//  - Deleted useless if/else statement, generic semantic updates

var bulletAmount;
var firstBulletLocation = Math.floor((Math.random() * 100) + 1);
var singleRound = 100 / 6;
var amountOfTurns = 0;

console.log("Asking player how many bullets he / she wishes to use")

bulletAmount = Math.floor(prompt("How many bullets do you wish to use? \nRemember, you can pick as many as 6 bullets"));

do {
	if(bulletAmount > 6) {
		console.log('Player has requested more bullets then possible, asking again');
		window.alert('You picked more than 6 bullets!');
		bulletAmount = prompt("Pick again, between 1 and 6");
	}
	else if(bulletAmount < 1) { 
		console.log('Player has entered less than 1 bullet or a negative amount, asking again');
		window.alert('Boo hoo, no bullets? \nAt least use 1');
		bulletAmount = prompt("Pick again, between 1 and 6");
	}
	else {
	}
}
	while(bulletAmount < 1 || bulletAmount > 6);
	console.log("Player selected " + bulletAmount + " bullet(s)");
	document.write("<p>Let's play, you are using " + bulletAmount + " bullet(s)</p>");


var chanceOfDeath = 100 / 6 * bulletAmount;

console.log("Chance when someone will die: " + chanceOfDeath + "%");
console.log("According to the location of the first bullet, someone will die whenever the chance is higher then: " + firstBulletLocation + "%!");

var bothAlive = 6;

	console.log("Confirming both the player and the computer are alive..");
	console.log("Confirmed! Starting a timed if / else statement that ends when one of them is dead");
	document.write("The game has started<br>");
	// document.getElementById('going').innerHTML="The game has started!";


if(bothAlive == 6) {

	amountOfTurns = amountOfTurns + 1;

		if(chanceOfDeath < firstBulletLocation) {
			console.log("You survived the first shot!");
			document.write("You survived the first shot!<br>");
			chanceOfDeath = chanceOfDeath + singleRound;
			bothAlive = bothAlive - 1;
			console.log("Amount of shots left is now " + bothAlive + "!");
			console.log("New chance of death: " + chanceOfDeath + "% after " + amountOfTurns + " shots!");
		}
		else {
			console.log("You have died =(");
			document.write("You have died after the first shot!<br>");
			// document.getElementById('outcome').innerHTML="You have died after the first shot!";
			bothAlive = 0;
		}
}

if(bothAlive == 5) {

	amountOfTurns = amountOfTurns + 1;

		if(chanceOfDeath < firstBulletLocation) {
			console.log("Computer survived the next shot!");
			document.write("Computer survived the second shot!<br>");
			chanceOfDeath = chanceOfDeath + singleRound;
			bothAlive = bothAlive - 1;
			console.log("Amount of shots left is now " + bothAlive + "!");
			console.log("New chance of death: " + chanceOfDeath + "% after " + amountOfTurns + " shots!");
		}
		else {
			console.log("Computer has died, good job!")
			document.write("Computer has died after the second shot!<br>");
			// document.getElementById('outcome').innerHTML="Computer has died after the second shot!";
			bothAlive = 0;
		}
}

if(bothAlive == 4) {

	amountOfTurns = amountOfTurns + 1;

		if(chanceOfDeath < firstBulletLocation ) {
			console.log("You survived the third shot!");
			document.write("You survived the third shot!<br>");
			chanceOfDeath = chanceOfDeath + singleRound;
			bothAlive = bothAlive - 1;
			console.log("Amount of shots left is now " + bothAlive + "!");
			console.log("New chance of death: " + chanceOfDeath + "% after " + amountOfTurns + " shots!");
		}
		else {
			console.log("You have died =(");
			document.write("You have died after the third shot!<br>");
			// document.getElementById('outcome').innerHTML="You have died after the third shot!";
			bothAlive = 0;
		}
}
if(bothAlive == 3) {

	amountOfTurns = amountOfTurns + 1;

		if(chanceOfDeath < firstBulletLocation) {
			console.log("Computer survived the next shot!");
			document.write("Computer survived the fourth shot!<br>");
			chanceOfDeath = chanceOfDeath + singleRound;
			bothAlive = bothAlive - 1;
			console.log("Amount of shots left is now " + bothAlive + "!");
			console.log("New chance of death: " + chanceOfDeath + "% after " + amountOfTurns + " shots!");
		}
		else {
			console.log("Computer has died, good job!")
			document.write("Computer has died after the fourth shot!<br>");
			// document.getElementById('outcome').innerHTML="Computer has died after the fourth shot!";
			bothAlive = 0;
		}
}
if(bothAlive == 2) {

	amountOfTurns = amountOfTurns + 1;

		if(chanceOfDeath < firstBulletLocation ) {
			console.log("You survived the fifth shot!");
			document.write("You survived the fifth shot!<br>");
			chanceOfDeath = 100;
			bothAlive = bothAlive - 1;
			console.log("Amount of shots left is now " + bothAlive + "!");
			console.log("New chance of death: " + chanceOfDeath + "% after " + amountOfTurns + " shots!");
		}
		else {
			console.log("You have died =(");
			document.write("You have died after the fifth shot!<br>");
			// document.getElementById('outcome').innerHTML="You have died after the fifth shot!";
			bothAlive = 0;
		}
}
if(bothAlive == 1) {

	amountOfTurns = amountOfTurns + 1;
	console.log("Computer has died, good job!")
	document.write("Computer has died after the last shot!<br>");
	// document.getElementById('outcome').innerHTML="Computer has died after the last shot!";
	bothAlive = 0;
}

if(bothAlive == 0) {

	console.log("The game has ended")
	document.write("<p>The game has ended!</p>");
}

else {
	console.log("Something went wrong")
}

//	document.getElementById("trigger").onclick = function(startTheGame) {
//    animate0(0);
//    return false;
//};

