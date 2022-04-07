const main = document.querySelector('main');

fetch('https://opensheet.elk.sh/1igRwZ_HCmEoMpqgMNWrBalOgcMSJItVK1DF-GSovweY/bt')
	.then(res => res.json())
	.then(data => {
		const ul = document.createElement('ul');

		console.log(data);
		data.forEach(item => {
			const li = document.createElement('li');
			const link = document.createElement('a');
			link.setAttribute('href', item.url)
			link.textContent = item.naam
			li.appendChild(link);
			ul.appendChild(li)
		})

		main.appendChild(ul);
	})
	.catch(err => {
		console.log(err);
		main.innerHTML = 'kapot, jammer, probeer het later nog eens'
	})