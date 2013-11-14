define([], function () {

    var element = (function () {

        function Element() { }

        Element.prototype.left = function () {
            return this.pos.x - this.width();
        };

        Element.prototype.right = function () {
            return this.pos.x + this.width();
        };

        Element.prototype.top = function () {
            return this.pos.y - this.height();
        };

        Element.prototype.bottom = function () {
            return this.pos.y + this.height();
        };

        Element.prototype.collided = function (obstacle) {
            return !(
                this.left() > obstacle.right()
                || this.right() < obstacle.left()
                || this.top() > obstacle.bottom()
                || this.bottom() < obstacle.top()
            );
        };

        return Element;

    })();

    return element;

});