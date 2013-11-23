define([
    'infrastructure/HealthBar',

    'domain/Entity'
], function (HealthBar, Entity) {

    function Character() { }

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

            this.pos.y -= 2;
        }
        if (this.keys.down) {
            if ((this.pos.y + this.config.height) >= 600) {
                return;
            }

            this.pos.y += 2;
        }
        if (this.keys.left) {
            if (this.pos.x <= 0) {
                return;
            }

            this.pos.x -= 2;
        }
        if (this.keys.right) {
            if ((this.pos.x + this.config.width) >= 895) {
                return;
            }

            this.pos.x += 2;
        }
    };

    // Damage

    Character.prototype.damages = function (damage) {
        var health = this.health - damage;
        this.setHealth(health);

        if (this.destroyed()) {
            this.pos = this.initPos();
            this.setHealth(50);
        }
    };

    // Move

    Character.prototype.up = function (move) { };

    Character.prototype.down = function (move) { };

    Character.prototype.left = function (move) { };

    Character.prototype.right = function (move) { };

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