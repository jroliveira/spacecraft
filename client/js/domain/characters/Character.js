define([
    'jquery',
    
    'infrastructure/HealthBar',

    'domain/Entity'
], function ($, HealthBar, Entity) {

    function Character() {
        $(this).on('damage', this.wasDestroyed);
    }

    Character.prototype = new Entity();

    Character.prototype.draw = function (context) {
        this.healthBar.draw(context);

        context.drawImage(
            this.imageSprite,
            this.currentRowSprite(),
            this.currentColSprite(),
            this.config.image.width,
            this.config.image.height,
            this.pos.x,
            this.pos.y,
            this.config.width,
            this.config.height
        );
    };

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

        $(this).trigger('update');
    };
    
    Character.prototype.respawn = function () {
        this.pos = this.config.pos;
        this.sprite = this.config.sprite;
        this.health = this.config.health;
    };

    // Damage

    Character.prototype.wasDestroyed = function (event) {
        var self = event.target;
        
        if (self.destroyed()) {
            self.respawn();
        }
    };

    // Move

    Character.prototype.up = function (move) {
        this.keys.up = move;

        $(this).trigger('upMove');
    };

    Character.prototype.down = function (move) {
        this.keys.down = move;

        $(this).trigger('downMove');
    };

    Character.prototype.left = function (move) {
        this.keys.left = move;
        
        $(this).trigger('leftMove');
    };

    Character.prototype.right = function (move) {
        this.keys.right = move;
        
        $(this).trigger('rightMove');
    };

    // Config

    Character.prototype.currentRowSprite = function () {
        return this.sprite.row * this.config.image.width;
    };

    Character.prototype.currentColSprite = function () {
        return this.sprite.col * this.config.image.height;
    };

    Character.prototype.initPos = function () {
        return { x: 1, y: 10 };
    };

    return Character;

});