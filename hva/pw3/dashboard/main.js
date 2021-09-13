// receive
var globalData = [{time: "0", pot: "0"}];

var refresh = setInterval(function updatePot() {

$.get("http://www.robertspier.nl/hva/pw3/report/output.json", function(data) {

    if(globalData[globalData.length - 1].time !== data.time) {
        
        console.log(data.time)

        $('#data-display').html("tijd: " + data.time + "dB: " + data.pot);

    }

});

}, 3000)

// send

var houses = {
	one: "0",
	two: "0",
	three: "0",
	four: "0",
	five: "0"
}

var update = setInterval(function() {

    var string;

    if(houses.one === "0") {
        string = "0"
    }
    else {
        string = "1"
    }

    if(houses.two === "0") {
        string = string + "0"
    }
    else {
        string = string + "2"
    }

    if(houses.three === "0") {
        string = string + "0"
    }
    else {
        string = string + "3"
    }

    if(houses.four === "0") {
        string = string + "0"
    }
    else {
        string = string + "4"
    }

    if(houses.five === "0") {
        string = string + "0"
    }
    else {
        string = string + "5"
    }

    console.log(string)

    $.post("http://www.robertspier.nl/hva/pw3/receive/fire.php", {
        string: string
    },
    function(data, status){
    	console.log('posted new data')
    });
}, 5000);

$('#report-1').click(function() {
	houses.one = "1"
	var countdown = setTimeout(function() {
		houses.one = "0";
	}, 15000)
})
$('#report-2').click(function() {
	houses.two = "1"
	var countdown = setTimeout(function() {
		houses.two = "0";
	}, 15000)
})
$('#report-3').click(function() {
	houses.three = "1"
	var countdown = setTimeout(function() {
		houses.three = "0";
	}, 15000)
})
$('#report-4').click(function() {
	houses.four = "1"
	var countdown = setTimeout(function() {
		houses.four = "0";
	}, 15000)
})
$('#report-5').click(function() {
	houses.five = "1"
	var countdown = setTimeout(function() {
		houses.five = "0";
	}, 15000)
})