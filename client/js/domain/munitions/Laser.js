define([
    'domain/munitions/Munition'
], function (Munition) {

    function Laser(config, character) {
        this.config = config;
        
        this.pos = character.initPosShot();
        this.health = config.health;
    }

    Laser.prototype = new Munition();

    return Laser;

});