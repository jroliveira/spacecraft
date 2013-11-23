define([
    'infrastructure/HealthBar',

    'domain/Element'
], function (HealthBar, Element) {

    function Player() { }

    Player.prototype = new Element();

    Player.prototype.draw = function (context) {
        this.healthBar.draw(context);

        context.drawImage(this.imageSprite, this.currentRowSprite(), this.currentColSprite(), this.image.width, this.image.height, this.pos.x, this.pos.y, this.width(), this.height());
    };

    Player.prototype.updates = function () {
        if (this.keys.up) {
            if (this.pos.y <= 10) {
                return;
            }

            this.pos.y -= 2;
        }
        if (this.keys.down) {
            if ((this.pos.y + this.height()) >= 600) {
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
            if ((this.pos.x + this.width()) >= 895) {
                return;
            }

            this.pos.x += 2;
        }
    };

    // Damage

    Player.prototype.damages = function (damage) {
        var health = this.health - damage;
        this.setHealth(health);

        if (this.destroyed()) {
            this.pos = this.initPos();
            this.setHealth(50);
        }
    };

    // Move

    Player.prototype.up = function (move) { };

    Player.prototype.down = function (move) { };

    Player.prototype.left = function (move) { };

    Player.prototype.right = function (move) { };

    // Config

    Player.prototype.width = function () {
        return this.image.width * 1.5;
    };

    Player.prototype.height = function () {
        return this.image.height * 1.5;
    };

    Player.prototype.currentRowSprite = function () {
        return this.sprite.row * this.image.width;
    };

    Player.prototype.currentColSprite = function () {
        return this.sprite.col * this.image.height;
    };

    Player.prototype.initPos = function () {
        return { x: 1, y: 10 };
    };

    return Player;

});