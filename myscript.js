

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

var Resources = function() {
    this.metal = 0;
    this.crystal = 0;
    this.deuterium = 0;
    this.energy = 0;

    this.refresh();
};

Resources.prototype.refresh = function () {
    this.metal = parseXNFloat( $('#count_metal').html() );
    this.crystal = parseXNFloat( $('#count_crystal').html() );
    this.deuterium = parseXNFloat( $('#count_deuterium').html() );
    this.energy = parseXNFloat( $('#energy span').html() );
};



var Building = function(build) {
    this.id = build;

    this.metal = 0;
    this.crystal = 0;
    this.deuterium = 0;
    this.energy = 0;

    this._getResources();
};

Building.prototype._getResources = function() {
    var label = this.id.label;

    var container = $("a:contains('" + label + "')").closest('div').parent();

    this.metal = $("img[src*='metal']", container).next().html() || "0";
    this.metal = parseXNFloat( this.metal );
    this.crystal = $("img[src*='crystal']", container).next().html() || "0";
    this.crystal = parseXNFloat( this.crystal );
    this.deuterium = $("img[src*='deuterium']", container).next().html() || "0";
    this.deuterium = parseXNFloat( this.deuterium );
    this.energy = $("img[src*='energy']", container).next().html() || "0";
    this.energy = parseXNFloat( this.energy );
};

Building.prototype.canBuild = function(res) {

    if (this.metal <= res.metal &&
        this.crystal <= res.crystal &&
        this.deuterium <= res.deuterium/* &&
        (res.energy - this.energy >= 0)*/ ) {

        return true;
    }

    return false;
};

Building.prototype.build = function() {

    console.log(buildUrl + this.id.id);
    location.href = buildUrl + this.id.id;

};

/** --- Building queue --- */

var BuildQueue = function() {
    this.planetUrl = "/planet";

    this.res = new Resources();

    this.buildings = [];

    this.isScheduled = false;
};

BuildQueue.prototype.add = function(id, time /*optional*/) {
    var building = new Building(id);
    this.buildings.push(building);
};

BuildQueue.prototype.useScheduled = function() {

    this.isScheduled = true;

    var schedule = localStorage.getItem('schedule');
    schedule = JSON.parse(schedule);

    console.log(schedule);

    for(var i in schedule) {
        this.add(schedule[i]);
    }
};


BuildQueue.prototype.currentQueueIsEmpty = function () {
    if ($('#queue_time').length > 0) {
        console.log("Game queue is NOT empty");
        return false;
    }

    console.log("Game queue is empty");
    return true;
};


BuildQueue.prototype._descheduleBuilding = function(index) {

    var schedule = [];
    for(var i in this.buildings) {
        if (i == index) continue;
        schedule.push(this.buildings[i].id);
    }
    localStorage.setItem('schedule', JSON.stringify(schedule));
};

BuildQueue.prototype.start = function() {
    console.log("queue start!");
    console.log(this.buildings);

    if (!this.currentQueueIsEmpty()) {
        console.log("Waiting...");
        return;
    }

    //for (var i in this.buildings) {
    if (!this.buildings[0].canBuild(this.res)) {
        console.log("Not enough minerals for " + this.buildings[0].id.label + "!");

        var min = 60000,
            max = 1200000;
        var waitingTime = 1200000 + Math.random() * (max - min) + min;

        setTimeout("location.href='" + this.planetUrl + "'", waitingTime);

        console.log("Waiting for " + waitingTime/60000 + " minutes");
        return;
    }

    console.log("start to build " + this.buildings[0].id.label);

    if (this.isScheduled) {
        console.log("descheduled");
        this._descheduleBuilding(0);
    }

    console.log("process building!");
    this.buildings[0].build();
    return;

    //}
};


/**
 * Application
 */

var queue = new BuildQueue();
queue.useScheduled();
//queue.add(buildingCodes.deuteriumMine);

queue.start();


controlPanel();

