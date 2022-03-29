const input = document.querySelector('input[type="number"]');
const result = document.querySelector('span');
const vakantie = document.querySelector("#vakantie");
const eindejaars = document.querySelector("#eindejaars");

vakantie.addEventListener('click', event => {
	result.innerHTML = convertSalary(Number(input.value))
})

eindejaars.addEventListener('click', event => {
	result.innerHTML = convertSalary(Number(input.value))
})

input.addEventListener('keyup', event => {
	result.innerHTML = convertSalary(Number(input.value))
})

function convertSalary(num) {
	num = num * 12; // naar jaar
	if(vakantie.checked) {
		num = num * 1.08 // vakantiegeld + 13e maand
	}
	if(eindejaars.checked) {
		num = num * 1.083 // vakantiegeld + 13e maand
	}
	num = num / 12 // naar maand
	num = num / 3.5 // naar 3.5x huur eis
	return Math.floor(num);
}