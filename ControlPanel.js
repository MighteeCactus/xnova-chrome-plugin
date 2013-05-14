
var ControlPanel = function() {
    this.container = $('body').append('<div id="chit" style="background-color:gray;border: 2px dashed pink;width:200px;height:200px;position:absolute;top:600px"></div>');

    $('#chit').append("<h3>Queue</h3>");
    this.buildings = $('#chit').append("<div id='chit_queue'></div>");

    $('#chit').append("<h3>Log</h3>");
    this.log = $('#chit').append("<div id='chit_log'></div>");
};

ControlPanel.prototype.showBuildings = function(buildings) {

    var list = $(this.buildings).append("<ul></ul>");
    for(var i in buildings) {
        $(list).append("<li>" + buildings[i].getLabel() + "</li>")
    }

};