define([
    'domain/enemy/Enemy'
], function (Enemy) {

    var asteroid = (function () {

        function Asteroid() {
            this.pos = { x: this.initPosX(), y: this.initPosY() };
            
            this.life = this.initLife();
            this.damage = 20;
            
            this.speedy = 1.5;
            
            this.image = new Image();
            this.image.src = "../../client/img/enemy/asteroid.png";
        }
        
        Asteroid.prototype = new Enemy();

        Asteroid.prototype.initLife = function () {
            return 10;
        };
        
        return Asteroid;

    })();

    return asteroid;

});