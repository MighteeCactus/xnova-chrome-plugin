

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


chrome.runtime.sendMessage({test: "123"}, function(response) {
    console.log("response from background");
    console.log(response);
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    alert("content side!");

    console.log(request);
    console.log(sender);
    console.log(sendResponse);
});
