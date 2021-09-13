(function(){
var i = 0;
    function stop(){
    clearTimeout(i);
    }
    
    function start(){
    i = setTimeout( timed, 1000 );
    }
    
    function timed(){
    document.getElementById("input").value++;
    start();
    }
    
window.stop = stop;
window.start = start;
})()