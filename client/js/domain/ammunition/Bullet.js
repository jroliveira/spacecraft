define([
    'infrastructure/HealthBar',
    
    'domain/ammunition/Ammunition'
], function (HealthBar, Ammunition) {

    function Bullet(ship) {
        this.image = new Image();
        this.image.src = "../../client/img/ammunition/bullet.png";

        this.pos = ship.initPosShot();

        this.health = this.initHealth();
        this.damage = 3;

        this.speedy = 3;
        
        this.healthBar = new HealthBar(this);
    }

    Bullet.prototype = new Ammunition();

    return Bullet;

});