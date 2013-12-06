define([
    'infrastructure/HealthBar',
    
    'domain/munitions/Munition'
], function (HealthBar, Munition) {

    function Missile(config, character) {
        this.config = config;
        
        this.pos = character.initPosShot();
        this.health = config.health;
    }

    Missile.prototype = new Munition();

    return Missile;

});