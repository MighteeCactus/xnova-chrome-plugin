

/**
 * Constants
 */
var buildUrl = "?cmd=insert&building=";


var buildingCodes = {
	metalMine:          {id: 1, label: "Рудник по добыче металла"},
	crystalMine:        {id: 2, label: "Рудник по добыче кристаллов"},
	deuteriumMine:      {id: 3, label: "Синтезатор дейтерия"},
	sunElectricity:     {id: 4, label: "Солнечная электростанция"},
    termoElectricity:   {id: 12, label: "Термоядерная электростанция"},
    robotFactory:       {id: 14, label: "Фабрика роботов"},
    shipyard:           {id: 21, label: "Верфь"},
    laboratory:         {id: 31, label: "Исследовательская лаборатория"},
    metalHold:          {id: 22, label: "Хранилище металла"},
    crystalHold:        {id: 23, label: "Хранилище кристаллов"},
    deuteriumHold:      {id: 24, label: "Хранилище дейтерия"}
};


var parseXNFloat = function(str) {
    str = str.replace(".", "");
    return parseFloat(str);
};


/**
 * Application
 */


$('#main_container').css('margin-left', '25%');

var queue = new BuildQueue({useSchedule: true});

var panel = new ControlPanel();
panel.showBuildingsForm();
panel.showBuildings(queue.buildings);
panel.showLogs(Logger.getLogs(), {order: 'descending'});

queue.start();

panel.showLogs(Logger.getLogs(), {order: 'descending'});
