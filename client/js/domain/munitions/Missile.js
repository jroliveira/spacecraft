define([
    'domain/munitions/Munition'
], function (Munition) {

    function Missile(config, character) {
        this.config = config;
        
        this.pos = character.initPosShot();
        this.health = config.health;
    }

    Missile.prototype = new Munition();

    return Missile;

});