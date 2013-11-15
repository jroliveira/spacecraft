define([], function () {

    var element = (function () {

        function Element() { }
        
        Element.prototype.width = function () {
            return this.image.width;
        };

        Element.prototype.height = function () {
            return this.image.height;
        };
        
        Element.prototype.damages = function (damage) {
            this.life = this.life - damage;

            if (this.life <= 0) {
                this.destroy();
            }
        };
        
        Element.prototype.destroy = function () {
            this.pos.x = this.initPosX();
            this.pos.y = this.initPosY();
            this.life = this.initLife();
        };
        
        Element.prototype.draw = function (context) {
            context.drawImage(this.image, this.pos.x, this.pos.y);
        };

        Element.prototype.horizontal = function () {
            return this.pos.x + this.width();
        };
        
        Element.prototype.vertical = function () {
            return this.pos.y + this.height();
        };

        Element.prototype.collided = function (obstacle) {
            return (this.pos.x <= obstacle.horizontal()
                && obstacle.pos.x <= this.horizontal()
                && this.pos.y <= obstacle.vertical()
                && obstacle.pos.y <= this.vertical());
        };

        return Element;

    })();

    return element;

});