define([
    'infrastructure/HealthBar',
    
    'domain/munitions/Munitions'
], function (HealthBar, Munitions) {

    function Missile(ship, config) {
        this.config = config;
        
        this.pos = ship.initPosShot();
        this.health = config.health;
        
        this.image = new Image();
        this.image.src = "../../client/img/munitions/missile.png";
        this.healthBar = new HealthBar(this);
    }

    Missile.prototype = new Munitions();

    return Missile;

});