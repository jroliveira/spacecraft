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

    // Config

    Character.prototype.currentRowSprite = function () {
        return this.sprite.row * this.config.image.width;
    };

    Character.prototype.currentColSprite = function () {
        return this.sprite.col * this.config.image.height;
    };

    return Character;

});