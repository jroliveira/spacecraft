define([
    'infrastructure/HealthBar',
    
    'domain/munitions/Munition'
], function (HealthBar, Munition) {

    function Missile(config, owner) {
        this.config = config;
        
        this.owner = owner;
        this.pos = owner.character.initPosShot();
        this.health = config.health;
        
        this.image = new Image();
        this.image.src = "../../client/img/munitions/missile.png";
        this.healthBar = new HealthBar(this);
    }

    Missile.prototype = new Munition();

    return Missile;

});