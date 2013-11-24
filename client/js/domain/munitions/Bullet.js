define([
    'infrastructure/HealthBar',
    
    'domain/munitions/Munition'
], function (HealthBar, Munition) {

    function Bullet(config, owner) {
        this.config = config;

        this.owner = owner;
        this.pos = owner.character.initPosShot();
        this.health = config.health;
        
        this.image = new Image();
        this.image.src = '../../client/img/munitions/bullet.png';
        this.healthBar = new HealthBar(this);
    }

    Bullet.prototype = new Munition();

    return Bullet;

});