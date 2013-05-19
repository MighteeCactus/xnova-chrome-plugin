

/**
 * Constants
 */



/**
 * Application
 */


$('#main_container').css('margin-left', '25%');

var queue = new BuildQueue({useSchedule: true});

var panel = new ControlPanel();
panel.showBuildingsForm();
panel.showBuildings(queue.buildings[queue.planetLocation]);
panel.showLogs(Logger.getLogs(), {order: 'descending'});

queue.start();

panel.showLogs(Logger.getLogs(), {order: 'descending'});
