define([
    'domain/Element'
], function (Element) {

    var ammunition = (function () {

        function Ammunition() { }

        Ammunition.prototype = new Element();

        Ammunition.prototype.initLife = function () {
            return 1;
        };

        Ammunition.prototype.updates = function () {
            if (this.pos.x >= 895) {
                this.life = 0;
            } else {
                this.pos.x = this.pos.x + this.speedy;
            }
        };

        return Ammunition;

    })();

    return ammunition;

});