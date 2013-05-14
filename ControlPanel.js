
var ControlPanel = function() {
    $('body').append('<div id="chit"></div>').elem;
    this.container = $('#chit');

    $('#chit').append("<h3>Очередь построек</h3>");
    $('#chit').append("<div id='chit_queue_form'></div>").elem;
    this.buildingsForm = $('#chit_queue_form');
    $('#chit').append("<div id='chit_queue'></div>").elem;
    this.buildings = $('#chit_queue');

    $('#chit').append("<h3 class='log-title'>Log</h3>");
    $('#chit').append("<div id='chit_log'></div>").elem;
    this.log = $('#chit_log');
};

ControlPanel.prototype.showBuildingsForm = function() {

    var self = this;

    this.buildingsForm.append('<form><select id="buildings"></select><span id="addBuilding" class="item-add">Добавить</span></form>');
    var options = '';
    for(var name in buildingCodes) {
        options += '<option value="' + name + '">' + buildingCodes[name].label + '</option>';
    }
    $('#buildings').append(options);

    $('#addBuilding').click(function() {

        var name = $('#buildings').val();
        Logger.log('add building ' + name + ' ' + buildingCodes[name].label);

        //TODO заменить вариантом получше
        queue.add(buildingCodes[name]);
        self.showBuildings(queue.buildings);

        return;
    });
}

ControlPanel.prototype.showBuildings = function(buildings) {

    this.buildings.empty();

    if (buildings.length == 0) {
        this.buildings.append('<p>Очередь пуста</p>')
    }

    this.buildings.append("<ul></ul>");
    var list = $('ul', this.buildings);
    for(var i in buildings) {
        list.append("<li class='item-building'><span class='name'>" + buildings[i].getLabel() + "</span><span data-index='" + i + "' class='item-delete'>[X]</span></li>");
    }

    //TODO заменить как-нибудь по другому
    $('.item-building .item-delete').click(function() {
        var index = $(this).attr('data-index');
        queue.removeBuilding(index);
        Logger.log('Building removed from queue ' + index);
        $(this).closest('li').remove();
    });

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