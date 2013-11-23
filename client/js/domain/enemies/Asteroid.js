define([
    'infrastructure/HealthBar',

    'domain/enemies/Enemy'
], function (HealthBar, Enemy) {

    function Asteroid(config) {
        this.config = config;
        
        this.pos = this.initPos();
        this.health = config.health;
        
        this.image = new Image();
        this.image.src = "../../client/img/enemies/asteroid.png";
        this.healthBar = new HealthBar(this);
    }

    Asteroid.prototype = new Enemy();

    return Asteroid;

});