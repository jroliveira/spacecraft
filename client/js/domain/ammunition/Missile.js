define([
    'infrastructure/HealthBar',
    
    'domain/ammunition/Ammunition'
], function (HealthBar, Ammunition) {

    function Missile(ship) {
        this.image = new Image();
        this.image.src = "../../client/img/ammunition/missile.png";
        
        this.pos = ship.initPosShot();

        this.health = this.initHealth();
        this.damage = 5;

        this.speedy = 5;
        
        this.healthBar = new HealthBar(this);
    }

    Missile.prototype = new Ammunition();

    return Missile;

});