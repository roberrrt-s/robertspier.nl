let button = document.querySelector('button');
let cookies = document.querySelector('div');

button.addEventListener('click', removeCookies)

console.log(document.cookie)

if(!document.cookie) {
	cookies.classList.add('is-visible');
}

function removeCookies() {
	document.cookie = "clicked=true";
	cookies.classList.add('is-closed');
}