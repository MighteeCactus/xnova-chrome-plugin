

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


/**
 * Application
 */

var queue = new BuildQueue({useSchedule: true});

var panel = new ControlPanel();
panel.showBuildings(queue.buildings);


queue.start();


