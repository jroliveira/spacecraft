define([
    'domain/Element'
], function (Element) {

    var asteroid = (function () {

        function Asteroid() {
            this.speedy = 2.5;
            this.pos = { x: 800, y: this.getRandomPos() };
            
            this.image = new Image();
            this.image.src = "../../client/img/asteroid.png";
        }
        
        Asteroid.prototype = new Element();

        Asteroid.prototype.getRandomPos = function () {
            var min = 1;
            var max = 600;
            
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        Asteroid.prototype.width = function () {
            return this.image.width;
        };
        
        Asteroid.prototype.height = function () {
            return this.image.height;
        };
        
        Asteroid.prototype.destroy = function () {
            this.pos.x = 800;
            this.pos.y = this.getRandomPos();
        };
        
        Asteroid.prototype.draw = function (context) {
            context.drawImage(this.image, this.pos.x, this.pos.y);
        };
        
        Asteroid.prototype.updates = function () {
            if (this.pos.x <= 0) {
                this.destroy();
            } else {
                this.pos.x = this.pos.x - this.speedy;
            }
        };

        return Asteroid;

    })();

    return asteroid;

});