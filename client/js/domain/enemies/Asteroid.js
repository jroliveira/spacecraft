define([
    'domain/enemies/Enemy'
], function (Enemy) {

    function Asteroid(config) {
        this.config = config;

        this.pos = this.initPos();
        this.health = config.health;
    }

    Asteroid.prototype = new Enemy();

    return Asteroid;

});