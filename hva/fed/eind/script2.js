/*jslint browser: true*/
/*globals console*/

// Forked off Pascale Numans eindopdracht with persmission.

window.onload = function() {

	var menu = document.querySelector("nav:first-of-type")
	var inklapbutton = document.querySelector("main");
	var inklapbutton2 = document.querySelector("body > section:nth-of-type(1)");
	var inklapbutton3 = document.querySelector("body > section:nth-of-type(2)");
	var inklapbutton4 = document.querySelector("aside");
	var inklapbutton5 = document.querySelector("body > footer");

	menu.classList.add('is-invisible')
	inklapbutton.classList.add('is-invisible');
	inklapbutton2.classList.add('is-invisible');
	inklapbutton3.classList.add('is-invisible');
	inklapbutton4.classList.add('is-invisible');
	inklapbutton5.classList.add('is-invisible');

	document.querySelector('figure').onclick = function(){
		menu.classList.toggle('is-invisible');
	}

	document.querySelector('div:nth-of-type(1)').onclick = function(){
		inklapbutton.classList.toggle('is-invisible');
	}

	document.querySelector('div:nth-of-type(2)').onclick = function(){
		inklapbutton2.classList.toggle('is-invisible');
	}

	document.querySelector('div:nth-of-type(3)').onclick = function(){
		inklapbutton3.classList.toggle('is-invisible');
	}

	document.querySelector('div:nth-of-type(4)').onclick = function(){
		inklapbutton4.classList.toggle('is-invisible');
	}
	document.querySelector('div:nth-of-type(5)').onclick = function(){
		inklapbutton5.classList.toggle('is-invisible');
	}
}
if (Modernizr.touch) {   
    document.write("This site might look better on a non-touch system"); 
} else {
	console.log("Modernizr werkt")
};