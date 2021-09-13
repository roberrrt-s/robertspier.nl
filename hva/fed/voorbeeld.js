function changeColors() {
    var div = document.querySelectorAll("div");
    var i;

    for (i = 0; i < div.length; i++) {
        div[i].style.backgroundColor = 'red';
    }
};

var divtest = document.querySelector('div');

document.querySelector('div').onclick = function() {
	divtest.classList.toggle('testclass');
}