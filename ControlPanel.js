
var ControlPanel = function() {
    $('body').append('<div id="chit"></div>').elem;
    this.container = $('#chit');

    $('#chit').append("<h3>Очередь построек</h3>");
    $('#chit').append("<div id='chit_queue'></div>").elem;
    this.buildings = $('#chit_queue');

    $('#chit').append("<h3 class='log-title'>Log</h3>");
    $('#chit').append("<div id='chit_log'></div>").elem;
    this.log = $('#chit_log');
};

ControlPanel.prototype.showBuildings = function(buildings) {

    this.buildings.append("<ul></ul>");
    var list = $('ul', this.buildings);
    for(var i in buildings) {
        list.append("<li class='item-building'>" + buildings[i].getLabel() + "<span class='item-delete'>[X]</span></li>");
    }

};


ControlPanel.prototype.showLogs = function(logs, param) {

    this.log.empty();
    var i;
    if (param.order == 'descending') {
        var newLogs = [];
        for(i = logs.length - 1; i >= 0; i--) {
            newLogs.push(logs[i]);
        }
        logs = newLogs;
    }

    for(var i in logs) {
        this.log.append("<p>" + logs[i] + "</p>");
    }

};