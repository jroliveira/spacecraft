define([
    'jquery',

    'domain/Entity'
], function ($, Entity) {

    function Munition() {
        $(this).on('damage', this.wasDestroyed);
    }

    Munition.prototype = new Entity();

    Munition.prototype.updates = function () {
        var width = 895 - this.config.width;

        if (this.pos.x >= width) {
            $(this).trigger('destroy', [this]);
        } else {
            this.pos.x = this.pos.x + this.config.speed;
        }
    };

    // Health

    Munition.prototype.showHealthBar = function () {
        return false;
    };

    // Damage

    Munition.prototype.wasDestroyed = function (event) {
        var self = event.target;
        
        if (self.destroyed()) {
            $(self).trigger('destroy', [self]);
        }
    };

    return Munition;

});