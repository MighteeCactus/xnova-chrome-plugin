
/**

schedule = [
	{
		"building_num": "time"
	}
]

*/

var source = 'localStorage|sessionStorage|cookie|data';
var buildUrl = "?cmd=insert&building=";


var schedule = localStorage.getItem('schedule');
if (schedule == undefined) {
	schedule = {time: 0, queue: []};
} else {
	schedule = JSON.parse(schedule);
}




var buildingCodes = {
	metalMine: 1,
	crystalMine: 2,
	deuteriumMine: 3,
	sunElectricity: 4
}


/**
time - время с текущего момента
нужно еще время с последнего сохранения
*/

var now = new Date();



function build(building, time) {
	
	var future = new Date();
	var now = new Date();
	
	schedule.time = now.getTime();
	console.log("Last save time: " + schedule.time);
	
	
	
	schedule.queue.push({ 1: time});
	var loc = "location.href='" + buildUrl + buildingCodes.metalMine + "'";
	console.log(loc);
	
	//setTimeout(loc, time);
	
}

//build(1, 5000);

function controlPanel() {

	$('body').append('<div id="chit" style="background-color:gray;border: 2px dashed pink;width:200px;height:200px;position:absolute;top:600px"></div>');
	
	$('#chit').append("<h3>Queue</h3>");
	$('#chit').append("<ul></ul>");
	console.log(schedule);
	for(var build in schedule.queue) {
		
		$('#chit ul').append("<li>" + schedule.queue[build].building + " time " + schedule.queue[build].time + "</li>");
		
	}
	

}


function saveSchedule() {
	var now = new Date();
	
	schedule.time = now.getTime();
	localStorage.setItem('schedule', JSON.stringify(schedule))
}


controlPanel();
console.log(schedule);
