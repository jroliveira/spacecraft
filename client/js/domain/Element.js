define([], function () {

    var element = (function () {

        function Element() { }

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