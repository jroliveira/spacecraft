define([
    'infrastructure/HealthBar',
    
    'domain/munitions/Munition'
], function (HealthBar, Munition) {

    function Laser(config, character) {
        this.config = config;
        
        this.pos = character.initPosShot();
        this.health = config.health;

        this.image = new Image();
        this.image.src = "../../client/img/munitions/laser.png";
        this.healthBar = new HealthBar(this);
    }

    Laser.prototype = new Munition();

    return Laser;

});