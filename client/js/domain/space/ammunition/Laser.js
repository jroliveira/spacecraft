define([
    'infrastructure/HealthBar',
    
    'domain/space/ammunition/Ammunition'
], function (HealthBar, Ammunition) {

    function Laser(ship) {
        this.image = new Image();
        this.image.src = "../../client/img/ammunition/laser.png";
        
        this.pos = ship.initPosShot();

        this.health = this.initHealth();
        this.damage = 10;

        this.speedy = 7;
        
        this.healthBar = new HealthBar(this);
    }

    Laser.prototype = new Ammunition();

    return Laser;

});