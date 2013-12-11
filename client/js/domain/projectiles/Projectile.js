define([
    'jquery',

    'domain/Living'
], function ($, Living) {

    function Projectile(config, character) {
        this.config = config;

        this.pos = character.initPosShot();
        this.health = config.health;
        
        $(this).on('collided', this.damages);
    }

    Projectile.prototype = new Living();

    Projectile.prototype.updates = function () {
        var width = this.config.canvas.width - this.config.width;

        if (this.pos.x >= width) {
            $(this).trigger('destroy', [this]);
        } else {
            this.pos.x = this.pos.x + this.config.speed;
        }
    };

    // Damage

    Projectile.prototype.damages = function (event, obstacle) {
        if (!(obstacle instanceof Living)) {
            return;
        }
        
        var self = event.target;

        self.health = self.health - obstacle.config.damage;
        
        if (self.destroyed()) {
            $(self).trigger('destroy', [self]);
        }
    };

    return Projectile;

});