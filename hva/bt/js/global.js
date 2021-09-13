var d = (function(){

	var start = function(e) {
		console.log('start')

		dragSrc = e.target;

		var get = document.getElementById('get');
		var options = document.getElementById('options');

		if(dragSrc === get) {
			options.parentNode.className = "content over";
			console.log('added over to options')
		}
		else if(dragSrc === options) {
			get.parentNode.className = "content over";
			console.log('added over to get')
		}
		else {
			console.log('Something went wrong (unknown element origin)');
		}
	};

	var enter = function(e) {
		console.log('enter');
	};

	var over = function(e) {
		e.preventDefault()
		console.log('over');
	};

	var drop = function(e) {
 		e.preventDefault();
		console.log('drop');

		var get = document.getElementById('get');
		var options = document.getElementById('options');

		console.log(e.target)

		console.log(dragSrc.parentNode)

		if(e.target === get && dragSrc.parentNode.parentNode === options) {

			var clone = dragSrc.parentNode.cloneNode(!0);
			options.removeChild(dragSrc.parentNode);
			get.appendChild(clone);
			ev.addEvents(clone.lastElementChild);

		}
		else if(e.target === options && dragSrc.parentNode.parentNode === get) {

			var clone = dragSrc.parentNode.cloneNode(!0);
			get.removeChild(dragSrc.parentNode);
			options.appendChild(clone);
			ev.addEvents(clone.lastElementChild);

		}
		else {
			console.log('Something went wrong! (faulty target)')
		}

		dragSrc = null;

	};

	var leave = function(e) {
		e.preventDefault();
		e.stopPropagation()
		console.log('leave');
	};

	var end = function(e) {
		console.log('end');

		if(e.srcElement.parentNode.parentNode === get) {
			options.parentNode.className = "content";
			console.log('removed over to options')
		}
		else if(e.srcElement.parentNode.parentNode === options) {
			get.parentNode.className = "content";
			console.log('removed over to get')
		}
		else {
			console.log('Something went wrong (unknown element origin)');
		}

	};

	var dragSrc = null;

	return {
		start: start,
		enter: enter,
		over: over,
		drop: drop,
		end: end,
		leave: leave,
		dragSrc: dragSrc
	}

}());

var c = (function(){

	var element = function(e) {

		var get = document.getElementById('get');
		var options = document.getElementById('options');
		var div = e.target;

		while(div.nodeName !== "DIV") {
			div = div.parentNode;
		}

		if(div.parentNode.parentNode === get) {
			var clone = div.parentNode.cloneNode(!0);
			get.removeChild(div.parentNode);
			options.appendChild(clone);
			ev.addEvents(clone.lastElementChild);
		}
		else if(div.parentNode.parentNode === options) {
			var clone = div.parentNode.cloneNode(!0);
			options.removeChild(div.parentNode);
			get.appendChild(clone);
			console.log(e);
			ev.addEvents(clone.lastElementChild);
		}
		else {
		}

	};

	return {
		element: element
	}

}())

var ev = (function(){

	var init = function() {

		var el = document.getElementsByClassName('alpha');

		if(document.addEventListener){

			var get = document.getElementById('get');
			var options = document.getElementById('options');
			get.addEventListener('drop', d.drop, !1);
			get.addEventListener('dragover', d.over, !1);

			options.addEventListener('drop', d.drop, !1);
			options.addEventListener('dragover', d.over, !1);

			for(var i = 0; i < el.length; i++) {
				el[i].addEventListener('click', c.element, !1);
				el[i].addEventListener('dragstart', d.start, !1);
				el[i].addEventListener('dragenter', d.enter, !1);
				el[i].addEventListener('dragleave', d.leave, !1);
				el[i].addEventListener('dragend', d.end, !1);
			}
		}

		else if(document.attachEvent) {
			for(var i = 0; i < el.length; i++) {
				el[i].attachEvent('click', c.element);
				el[i].attachEvent('dragstart', d.start);
				el[i].attachEvent('dragenter', d.enter);
				el[i].attachEvent('dragleave', d.leave);
				el[i].attachEvent('dragend', d.end);
			}
		}

	}

	var addEvents = function(el) {

		if(document.addEventListener){  
			el.addEventListener('click', c.element, !1);
			el.addEventListener('dragstart', d.start, !1);
			el.addEventListener('dragenter', d.enter, !1);
			el.addEventListener('dragleave', d.leave, !1);
			el.addEventListener('dragend', d.end, !1);
		} else if (document.attachEvent){  
			el.attachEvent('click', c.element);
			el.attachEvent('dragstart', d.start);
			el.attachEvent('dragenter', d.enter);
			el.attachEvent('dragleave', d.leave);
			el.attachEvent('dragend', d.end);
		}
	};

	return {
		init: init,
		addEvents: addEvents
	}


}())

ev.init();