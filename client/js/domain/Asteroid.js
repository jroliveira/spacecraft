define([
    'domain/Element'
], function (Element) {

    var asteroid = (function () {

        function Asteroid() {
            this.speedy = 2.5;
            this.pos = { x: 800, y: 237 };
            
            this.image = new Image();
            this.image.src = "../../client/img/asteroid.png";
        }
        
        Asteroid.prototype = new Element();
        
        Asteroid.prototype.width = function () {
            return this.image.width;
        };
        
        Asteroid.prototype.height = function () {
            return this.image.height;
        };
        
        Asteroid.prototype.draw = function (context) {
            context.drawImage(this.image, this.pos.x, this.pos.y);
        };
        
        Asteroid.prototype.updates = function () {
            this.pos.x = (this.pos.x <= 0) ? 800 : this.pos.x - this.speedy;
        };

        return Asteroid;

    })();

    return asteroid;

});