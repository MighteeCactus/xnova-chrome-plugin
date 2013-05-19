/**
 * Buildings queue
 * Checks if building can be build and build it. Queue is stored in localStoragetgf
 */

var BuildQueue = function(params) {
    this.planetUrl = Engine.planetUrl;

    this.res = new Resources();

    this.buildings = {};

    this.isScheduled = false;

    this.planetLocation = this.getPlanetLocation();

    params = params || {};
    if (params.useSchedule) {
        this.useScheduled();
    }
};



/**
 * Add building to queue
 * @param id
 */
BuildQueue.prototype.add = function(id, planetLocation) {

    if (this.buildings[planetLocation] == undefined) {
        this.buildings[planetLocation] = [];
    }

    planetLocation = planetLocation || this.planetLocation;

    var building = new Building(id);
    this.buildings[planetLocation].push(building);

    this.saveBuildings();
};

/**
 * If queue is scheduled this method removes currently building building from queue
 */
BuildQueue.prototype._descheduleBuilding = function(index) {

    var schedule = [];
    for(var i in this.buildings[this.planetLocation]) {
        if (i == index) continue;
        schedule.push(this.buildings[this.planetLocation][i]);
    }

    this.buildings[this.planetLocation] = schedule;

    this.saveBuildings();
};

BuildQueue.prototype.removeBuilding = function(index) {

    /*var newBuildings = [];
    for(var i in this.buildings[this.planetLocation]) {
        if (i == index) continue;
        newBuildings.push(this.buildings[this.planetLocation][i]);
    } */

    this._descheduleBuilding(index);
    //this.buildings[this.planetLocation] = newBuildings;

};

/**
 * If building are scheduled in localStorage use this method
 */
BuildQueue.prototype.useScheduled = function() {

    this.isScheduled = true;

    var schedules = localStorage.getItem(Engine.scheduleName);
    schedules = JSON.parse(schedules);

    for (var planet in schedules) {

        var schedule = schedules[planet];
        for(var i in schedule) {
            this.add(schedule[i], planet);
        }

    }

    if (this.buildings[this.planetLocation] == undefined) {
        this.buildings[this.planetLocation] = [];
    }
};

/**
 * Check if XNova is currently building anything
 * @return {boolean}
 */
BuildQueue.prototype.currentQueueIsEmpty = function () {
    if ($('#queue_time').length > 0) {
        Logger.log("Game queue is NOT empty");
        return false;
    }

    Logger.log("Game queue is empty");
    return true;
};

BuildQueue.prototype.saveBuildings = function() {

    var ids = {};

    for(var planet in this.buildings) {
        ids[planet] = [];
        for(var i in this.buildings[planet]) {
            ids[planet].push(this.buildings[planet][i].id);
        }
    }

    localStorage.setItem(Engine.scheduleName, JSON.stringify(ids));
};


BuildQueue.prototype.getPlanetLocation = function() {

    return $('a[href="/galaxy"]', '#main_window').html();

};



/**
 * Main chit of the plugin - handles building automatic queue
 */
BuildQueue.prototype.start = function() {
    Logger.log("Queue is about to start!");

    if (this.buildings[this.planetLocation].length == 0) {
        Logger.log("Building queue is empty. Waiting for new orders imperor!");
        return;
    }

    if (!this.currentQueueIsEmpty()) {
        Logger.log("Waiting...");
        return;
    }

    if (!this.buildings[this.planetLocation][0].canBuild(this.res)) {
        Logger.log("Not enough minerals for " + this.buildings[this.planetLocation][0].id.label + "!");

        var min = 60000,
            max = 1200000;
        var waitingTime = 1200000 + Math.random() * (max - min) + min;

        setTimeout("location.href='" + this.planetUrl + "'", waitingTime);

        Logger.log("Waiting for " + parseInt(waitingTime/60000) + " minutes");
        return;
    }

    Logger.log("start to build " + this.buildings[this.planetLocation][0].id.label);

    Logger.log("process building!");
    this.buildings[this.planetLocation][0].build();

    if (this.isScheduled) {
        Logger.log("descheduled item " + this.buildings[this.planetLocation][0]);
        this._descheduleBuilding(0);
    }


};
