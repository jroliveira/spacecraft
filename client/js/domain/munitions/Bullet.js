define([
    'domain/munitions/Munition'
], function (Munition) {

    function Bullet(config, character) {
        this.config = config;

        this.pos = character.initPosShot();
        this.health = config.health;
    }

    Bullet.prototype = new Munition();

    return Bullet;

});