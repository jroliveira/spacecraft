define([
    'infrastructure/HealthBar',
    
    'domain/munitions/Munitions'
], function (HealthBar, Munitions) {

    function Laser(ship, config) {
        this.config = config;
        
        this.pos = ship.initPosShot();
        this.health = config.health;

        this.image = new Image();
        this.image.src = "../../client/img/munitions/laser.png";
        this.healthBar = new HealthBar(this);
    }

    Laser.prototype = new Munitions();

    return Laser;

});