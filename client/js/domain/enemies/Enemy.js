define([
    'jquery',
    
    'domain/Living'
], function ($, Living) {

    function Enemy() {
        $(this).on('collided', this.damages);
    }

    Enemy.prototype = new Living();

    Enemy.prototype.updates = function () {
        if (this.pos.x <= 0) {
            $(this).trigger('destroy', [this]);
        } else {
            this.pos.x = this.pos.x - this.config.speed;
        }
    };

    // Damage

    Enemy.prototype.damages = function (event, obstacle) {
        if (!(obstacle instanceof Living)) {
            return;
        }
        
        var self = event.target;
        
        self.health = self.health - obstacle.config.damage;
        
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