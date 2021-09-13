// Basic state works with submitting, normally I would do this serverside using PHP or NodeJS, but i'm not experienced enough to build something like that... that is, not yet!

(function() {
	var basic = {

		init: function() {
			var button = document.getElementById('submit');
			button.addEventListener('click', function() {
				basic.order();
			})
		},

		order: function() {
			var checked = document.querySelectorAll('input:checked');
			var unchecked = document.querySelectorAll('input:not(:checked)');
			var get = document.getElementById('get');
			var options = document.getElementById('options')

			for(var i = 0; i < checked.length; i++) {
				var el = checked[i].parentNode.parentNode.parentNode;

				if(el.parentNode !== document.getElementById('get')) {
					var clone = el.cloneNode(true);
					options.removeChild(el);
					get.appendChild(clone);
				}
			}

			for(var i = 0; i < unchecked.length; i++) {
				var el = unchecked[i].parentNode.parentNode.parentNode;

				if(el.parentNode !== document.getElementById('options')) {
					var clone = el.cloneNode(true);
					get.removeChild(el);
					options.appendChild(clone);
				}
			}

			e.init();
			
		}

	}

	basic.init();

}())