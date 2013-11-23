define([
    'infrastructure/HealthBar',
    
    'domain/munitions/Munitions'
], function (HealthBar, Munitions) {

    function Bullet(ship, config) {
        this.config = config;

        this.pos = ship.initPosShot();
        this.health = config.health;
        
        this.image = new Image();
        this.image.src = '../../client/img/munitions/bullet.png';
        this.healthBar = new HealthBar(this);
    }

    Bullet.prototype = new Munitions();

    return Bullet;

});