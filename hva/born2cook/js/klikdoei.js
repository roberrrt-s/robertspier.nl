// START THE TIMELINE

window.onload = function() {

// IMPORTING AUDIO (via: Freesound.org // @mickleness)

var audio = new Audio('./audio/a.mp3');

// SWITCH BETWEEN TOILET MODE / NORMAL MODE

	var toiletswitch = document.getElementById("toilet")
	var normaal = document.getElementById("normaal")

	document.getElementById("toiletswitch").onclick = function(){
		toiletswitch.classList.toggle('okedoei');
		normaal.classList.toggle('okedoei');
	}

// NORMAL MODE REMOVE

	document.getElementById("closemsg1").onclick = function(){
		msg1.classList.add('okedoei');
	}
	document.getElementById("closemsg2").onclick = function(){
		msg2.classList.add('okedoei');
	}
	document.getElementById("closemsg3").onclick = function(){
		msg3.classList.add('okedoei');
	}
	document.getElementById("closemsg4").onclick = function(){
		msg4.classList.add('okedoei');
	}
	document.getElementById("closemsg5").onclick = function(){
		msg5.classList.add('okedoei');
	}
	document.getElementById("closemsg6").onclick = function(){
		msg6.classList.add('okedoei');
	}

// NORMAL MODE SPAWN

	setTimeout(function(){
		msg1.classList.remove('okedoei'),
		audio.play();
	}, 11000)
	setTimeout(function(){
		msg2.classList.remove('okedoei'),
		audio.play();
	}, 48000)
	setTimeout(function(){
		msg3.classList.remove('okedoei'),
		audio.play();
	}, 77000)
	setTimeout(function(){
		msg4.classList.remove('okedoei'),
		audio.play();
	}, 131000)
	setTimeout(function(){
		msg5.classList.remove('okedoei'),
		audio.play();
	}, 218000)
	setTimeout(function(){
		msg6.classList.remove('okedoei'),
		audio.play();
	}, 240000)

// TOILET MODE SPAWN

	setTimeout(function(){msg1t.classList.remove('okedoei')}, 22000)
	setTimeout(function(){msg2t.classList.remove('okedoei')}, 28000)
	setTimeout(function(){msg3t.classList.remove('okedoei')}, 35000)
	setTimeout(function(){msg4t.classList.remove('okedoei')}, 48000)
	setTimeout(function(){msg5t.classList.remove('okedoei')}, 50000)
	setTimeout(function(){msg6t.classList.remove('okedoei')}, 57000)
	setTimeout(function(){msg7t.classList.remove('okedoei')}, 65000)
	setTimeout(function(){msg8t.classList.remove('okedoei')}, 73000)
	setTimeout(function(){msg9t.classList.remove('okedoei')}, 90000)
	setTimeout(function(){msg10t.classList.remove('okedoei')}, 104000)
	setTimeout(function(){msg11t.classList.remove('okedoei')}, 119000)
	setTimeout(function(){msg12t.classList.remove('okedoei')}, 131000)
	setTimeout(function(){msg13t.classList.remove('okedoei')}, 148000)
	setTimeout(function(){msg14t.classList.remove('okedoei')}, 162000)
	setTimeout(function(){msg15t.classList.remove('okedoei')}, 170000)
	setTimeout(function(){msg16t.classList.remove('okedoei')}, 176000)
	setTimeout(function(){msg17t.classList.remove('okedoei')}, 190000)
	setTimeout(function(){msg18t.classList.remove('okedoei')}, 204000)
	setTimeout(function(){msg19t.classList.remove('okedoei')}, 218000)
	setTimeout(function(){msg20t.classList.remove('okedoei')}, 226000)
	setTimeout(function(){msg21t.classList.remove('okedoei')}, 235000)
	setTimeout(function(){msg22t.classList.remove('okedoei')}, 248000)

// TOILET MODE REMOVE

	setTimeout(function(){msg1t.classList.add('okedoei')}, 42000)
	setTimeout(function(){msg2t.classList.add('okedoei')}, 48000)
	setTimeout(function(){msg3t.classList.add('okedoei')}, 55000)
	setTimeout(function(){msg4t.classList.add('okedoei')}, 68000)
	setTimeout(function(){msg5t.classList.add('okedoei')}, 70000)
	setTimeout(function(){msg6t.classList.add('okedoei')}, 77000)
	setTimeout(function(){msg7t.classList.add('okedoei')}, 85000)
	setTimeout(function(){msg8t.classList.add('okedoei')}, 93000)
	setTimeout(function(){msg9t.classList.add('okedoei')}, 110000)
	setTimeout(function(){msg10t.classList.add('okedoei')}, 124000)
	setTimeout(function(){msg11t.classList.add('okedoei')}, 139000)
	setTimeout(function(){msg12t.classList.add('okedoei')}, 151000)
	setTimeout(function(){msg13t.classList.add('okedoei')}, 168000)
	setTimeout(function(){msg14t.classList.add('okedoei')}, 182000)
	setTimeout(function(){msg15t.classList.add('okedoei')}, 190000)
	setTimeout(function(){msg16t.classList.add('okedoei')}, 196000)
	setTimeout(function(){msg17t.classList.add('okedoei')}, 210000)
	setTimeout(function(){msg18t.classList.add('okedoei')}, 224000)
	setTimeout(function(){msg19t.classList.add('okedoei')}, 238000)
	setTimeout(function(){msg20t.classList.add('okedoei')}, 246000)
	setTimeout(function(){msg21t.classList.add('okedoei')}, 255000)
	setTimeout(function(){msg22t.classList.add('okedoei')}, 260000)

//  CALL TO ACTIONS QUIZ

	var form1 = document.getElementById("form1")
	var dank1 = document.getElementById("dank1")

	document.getElementById("stem1").onclick = function(){
		form1.classList.add('okedoei');
		dank1.classList.remove('okedoei');
	}

// END OF SEQUENCE

  setTimeout(function(){ window.location.assign("eind.html")}, 260000)	

}