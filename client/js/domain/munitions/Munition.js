define([
    'jquery',

    'domain/Living'
], function ($, Living) {

    function Munition() {
        $(this).on('collided', this.damages);
    }

    Munition.prototype = new Living();

    Munition.prototype.updates = function () {
        var width = 895 - this.config.width;

        if (this.pos.x >= width) {
            $(this).trigger('destroy', [this]);
        } else {
            this.pos.x = this.pos.x + this.config.speed;
        }
    };

    // Damage

    Munition.prototype.damages = function (event, obstacle) {
        var self = event.target;

        self.health = self.health - obstacle.health;
        self.setHealth(self.health);

        if (self.destroyed()) {
            $(self).trigger('destroy', [self]);
        }
    };

    return Munition;

});