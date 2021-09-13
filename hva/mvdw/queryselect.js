/*jslint browser: true*/
/*globals console*/

window.onload = function() {

	var inklapbutton1 = document.querySelector("section > section:first-of-type");
	var inklapbutton2 = document.querySelector("section > section:nth-of-type(1)");
	var inklapbutton3 = document.querySelector("section > section:nth-of-type(2)");
	var inklapbutton4 = document.querySelector("section > section:nth-of-type(3)");
	var inklapbutton5 = document.querySelector("section > section:nth-of-type(4)");

	document.querySelector('p > a:first-of-type').onclick = function(){
		inklapbutton2.classList.remove('is-invisible');
		inklapbutton3.classList.remove('is-invisible');
		inklapbutton4.classList.remove('is-invisible');
		inklapbutton5.classList.remove('is-invisible');
	}

	document.querySelector('p > a:nth-of-type(2)').onclick = function(){
		inklapbutton2.classList.remove('is-invisible');
		inklapbutton3.classList.add('is-invisible');
		inklapbutton4.classList.add('is-invisible');
		inklapbutton5.classList.add('is-invisible');	
	}

	document.querySelector('p > a:nth-of-type(3)').onclick = function(){
		inklapbutton3.classList.remove('is-invisible');
		inklapbutton2.classList.add('is-invisible');
		inklapbutton4.classList.add('is-invisible');
		inklapbutton5.classList.add('is-invisible');
	}

	document.querySelector('p > a:nth-of-type(4)').onclick = function(){
		inklapbutton4.classList.remove('is-invisible');
		inklapbutton2.classList.add('is-invisible');
		inklapbutton3.classList.add('is-invisible');
		inklapbutton5.classList.add('is-invisible');
	}

	document.querySelector('p > a:nth-of-type(5)').onclick = function(){
		inklapbutton5.classList.remove('is-invisible');
		inklapbutton2.classList.add('is-invisible');
		inklapbutton3.classList.add('is-invisible');
		inklapbutton4.classList.add('is-invisible');
	}
}
