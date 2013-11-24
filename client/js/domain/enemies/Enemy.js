define([
    'jquery',
    
    'domain/Entity'
], function ($, Entity) {

    function Enemy() {
        $(this).on('damage', this.wasDestroyed);
    }

    Enemy.prototype = new Entity();

    Enemy.prototype.updates = function () {
        if (this.pos.x <= 0) {
            $(this).trigger('destroy', [this]);
        } else {
            this.pos.x = this.pos.x - this.config.speed;
        }
    };

    // Damage

    Enemy.prototype.wasDestroyed = function (event) {
        var self = event.target;

        if (self.destroyed()) {
            $(self).trigger('destroy', [self]);
        }
    };

    // Config

    Enemy.prototype.initPos = function () {
        var min = 1;
        var max = 600 - this.config.height;
        var posY = Math.floor(Math.random() * (max - min + 1)) + min;

        return { x: 895, y: posY };
    };

    return Enemy;

});