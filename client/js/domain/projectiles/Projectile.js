define([
    'jquery',

    'domain/Living'
], function ($, Living) {

    function Projectile(config, character) {
        this.config = config;

        this.pos = character.initPosShot();
        this.health = config.health;
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

    Projectile.prototype.resolvesCollision = function (obstacle) {
        if (!(obstacle instanceof Living)) {
            return;
        }
        
        this.health = this.health - obstacle.config.damage;
        
        if (this.destroyed()) {
            $(this).trigger('destroy', [this]);
        }
    };

    return Projectile;

});