define([
    'infrastructure/HealthBar',

    'domain/enemy/Enemy'
], function (HealthBar, Enemy) {

    function Asteroid() {
        this.image = new Image();
        this.image.src = "../../client/img/enemy/asteroid.png";
        
        this.pos = { x: this.initPosX(), y: this.initPosY() };
        
        this.health = 10;
        this.damage = 20;

        this.speedy = 1.5;
        
        this.healthBar = new HealthBar(this);
    }

    Asteroid.prototype = new Enemy();

    return Asteroid;

});