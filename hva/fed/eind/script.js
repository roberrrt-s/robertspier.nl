/*jslint browser: true*/
/*globals console*/

// Forked off Pascale Numans eindopdracht with permission .

window.onload = function() {

	var menu = document.querySelector("nav:first-of-type")
	var projecten = document.querySelector("fieldset:nth-child(3)");
	var stages = document.querySelector("fieldset:nth-child(4)");

	projecten.classList.add('is-invisible-hd');
	stages.classList.add('is-invisible-hd');
	menu.classList.add('is-invisible-hd')

	document.querySelector('figure').onclick = function(){
		menu.classList.toggle('is-invisible-hd');
	}

	document.querySelector('input[type=radio]').onclick = function(){
		projecten.classList.add('is-visible-hd');
		stages.classList.remove('is-visible-hd');
	}

	document.querySelector('input[type=radio]:last-of-type').onclick = function(){
		stages.classList.add('is-visible-hd');
		projecten.classList.remove('is-visible-hd');
	}
}

if (Modernizr.touch) {   
    alert("This site might look better on a non-touch system"); 
} else {
	console.log("Modernizr werkt")
};