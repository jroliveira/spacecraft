define([
    'domain/Element'
], function (Element) {

    var ammunition = (function () {

        function Ammunition() { }

        Ammunition.prototype = new Element();

        Ammunition.prototype.initLife = function () {
            return 1;
        };

        Ammunition.prototype.destroy = function () {
            this.pos.x = 895;
            this.pos.y = 0;
        };

        Ammunition.prototype.updates = function () {
            this.pos.x = this.pos.x + this.speedy;
        };

        return Ammunition;

    })();

    return ammunition;

});