/**
 * Resources of the game
 */

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