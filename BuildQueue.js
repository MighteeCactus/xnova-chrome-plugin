/**
 * Buildings queue
 * Checks if building can be build and build it. Queue is stored in localStoragetgf
 */

var BuildQueue = function(params) {
    this.planetUrl = "/planet";

    this.res = new Resources();

    this.buildings = [];

    this.isScheduled = false;

    params = params || {};
    if (params.useSchedule) {
        this.useScheduled();
    }
};

/**
 * Add building to queue
 * @param id
 * @param time
 */
BuildQueue.prototype.add = function(id, time /*optional*/) {
    var building = new Building(id);
    this.buildings.push(building);
};

/**
 * If building are scheduled in localStorage use this method
 */
BuildQueue.prototype.useScheduled = function() {

    this.isScheduled = true;

    var schedule = localStorage.getItem('schedule');
    schedule = JSON.parse(schedule);

    for(var i in schedule) {
        this.add(schedule[i]);
    }
};

/**
 * Check if XNova is currently building anything
 * @return {boolean}
 */
BuildQueue.prototype.currentQueueIsEmpty = function () {
    if ($('#queue_time').length > 0) {
        console.log("Game queue is NOT empty");
        return false;
    }

    console.log("Game queue is empty");
    return true;
};

/**
 * If queue is scheduled this method removes currently building building from queue
 */
BuildQueue.prototype._descheduleBuilding = function(index) {

    var schedule = [];
    for(var i in this.buildings) {
        if (i == index) continue;
        schedule.push(this.buildings[i].id);
    }
    localStorage.setItem('schedule', JSON.stringify(schedule));
};

/**
 * Main chit of the plugin - handles building automatic queue
 */
BuildQueue.prototype.start = function() {
    console.log("Queue is about to start!");

    if (this.buildings.length == 0) {
        console.log("Building queue is empty. Waiting for new orders imperor!");
    }

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
