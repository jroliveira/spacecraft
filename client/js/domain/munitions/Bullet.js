define([
    'infrastructure/HealthBar',
    
    'domain/munitions/Munition'
], function (HealthBar, Munition) {

    function Bullet(config, character) {
        this.config = config;

        this.pos = character.initPosShot();
        this.health = config.health;
        
        this.image = new Image();
        this.image.src = '../../client/img/munitions/bullet.png';
        this.healthBar = new HealthBar(this);
    }

    Bullet.prototype = new Munition();

    return Bullet;

});