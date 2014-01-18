define([
    'jquery',

    'views/game/domain/Living'
], function ($, Living) {

    function Enemy() { }

    Enemy.prototype = new Living();

    Enemy.prototype.updates = function () {
        if (this.pos.x <= 0) {
            $(this).trigger('destroy', [this]);
        } else {
            this.pos.x = this.pos.x - this.config.speed;
        }
    };

    // Damage

    Enemy.prototype.resolvesCollision = function (obstacle) {
        if (!(obstacle instanceof Living)) {
            return;
        }

        this.health = this.health - obstacle.config.damage;

        if (this.destroyed()) {
            $(this).trigger('destroy', [this]);
        }
    };

    // Config

    Enemy.prototype.initPos = function () {
        var min = 1;
        var max = 600 - this.config.height;
        var posY = Math.floor(Math.random() * (max - min + 1)) + min;

        return { x: 1170, y: posY };
    };

    return Enemy;

});