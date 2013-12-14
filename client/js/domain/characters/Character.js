define([
    'jquery',

    'domain/Living'
], function ($, Living) {

    function Character() {
        this.timeNextMove = 0;
    }

    Character.prototype = new Living();

    Character.prototype.iCanMove = function () {
        this.timeNextMove++;

        if (this.timeNextMove < this.config.timeNextMove) {
            return false;
        }

        this.timeNextMove = 0;

        return true;
    };

    Character.prototype.moves = function () { };

    Character.prototype.stop = function () { };

    Character.prototype.updates = function () {
        if (this.keys.up) {
            if (this.pos.y <= 10) {
                return;
            }

            this.pos.y -= this.config.speed.up;
        }
        if (this.keys.down) {
            if ((this.pos.y + this.config.height) >= this.config.canvas.height) {
                return;
            }

            this.pos.y += this.config.speed.down;
        }
        if (this.keys.left) {
            if (this.pos.x <= 0) {
                return;
            }

            this.pos.x -= this.config.speed.left;
        }
        if (this.keys.right) {
            if ((this.pos.x + this.config.width) >= this.config.canvas.width) {
                return;
            }

            this.pos.x += this.config.speed.right;
        }
    };

    Character.prototype.respawn = function () {
        this.pos = this.config.pos;
        this.sprite = this.config.sprite;
        this.health = this.config.health;
    };

    // Damage

    Character.prototype.resolvesCollision = function (obstacle) {
        if (!(obstacle instanceof Living)) {
            return;
        }

        this.health = this.health - obstacle.config.damage;

        if (this.destroyed()) {
            this.respawn();
        }
    };

    // Config

    Character.prototype.currentRowSprite = function () {
        return this.sprite.row * this.config.image.width;
    };

    Character.prototype.currentColSprite = function () {
        return this.sprite.col * this.config.image.height;
    };

    return Character;

});