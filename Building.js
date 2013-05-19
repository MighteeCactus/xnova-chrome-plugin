/**
 * Building that can or cannot be build
 */

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
    this.metal = Engine.parseXNFloat( this.metal );
    this.crystal = $("img[src*='crystal']", container).next().html() || "0";
    this.crystal = Engine.parseXNFloat( this.crystal );
    this.deuterium = $("img[src*='deuterium']", container).next().html() || "0";
    this.deuterium = Engine.parseXNFloat( this.deuterium );
    this.energy = $("img[src*='energy']", container).next().html() || "0";
    this.energy = Engine.parseXNFloat( this.energy );
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

    Logger.log("Go to: " + Engine.buildUrl + this.id.id);
    location.href = Engine.buildUrl + this.id.id;

};

Building.prototype.getLabel = function() {
    return this.id.label;
};
