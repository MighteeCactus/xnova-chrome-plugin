

/**
 * Constants
 */
var buildUrl = "?cmd=insert&building=";


var buildingCodes = {
	metalMine:      {id: 1, label: "Рудник по добыче металла"},
	crystalMine:    {id: 2, label: "Рудник по добыче кристаллов"},
	deuteriumMine:  {id: 3, label: "Синтезатор дейтерия"},
	sunElectricity: {id: 4, label: "Солнечная электростанция"}
};


var parseXNFloat = function(str) {
    str = str.replace(".", "");
    return parseFloat(str);
}


function controlPanel() {

	$('body').append('<div id="chit" style="background-color:gray;border: 2px dashed pink;width:200px;height:200px;position:absolute;top:600px"></div>');
	
	$('#chit').append("<h3>Queue</h3>");
	$('#chit').append("<ul></ul>");
	

}


/**
 * Application
 */

var queue = new BuildQueue();
queue.useScheduled();

queue.start();


controlPanel();

