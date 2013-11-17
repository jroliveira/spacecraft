define([
    'infrastructure/HealthBar',

    'domain/land/Element'
], function (HealthBar, Element) {

    function Character() {
        this.imageSprite = new Image();
        this.imageSprite.src = "../../client/img/characterSprite.png";

        this.pos = this.initPos();

        this.health = 50;
        this.damage = 100;

        this.keys = { up: false, down: false, right: false, left: false };

        this.image = { width: 32, height: 32 };
        this.sprite = { row: 0, col: 0 };

        this.healthBar = new HealthBar(this);
    }

    Character.prototype = new Element();

    Character.prototype.draw = function (context) {
        context.drawImage(this.imageSprite, this.currentRowSprite(), this.currentColSprite(), this.image.width, this.image.height, this.pos.x, this.pos.y, this.width(), this.height());
    };

    Character.prototype.updates = function () {
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

    Character.prototype.damages = function (damage) {
        var health = this.health - damage;
        this.setHealth(health);

        if (this.destroyed()) {
            this.pos = this.initPos();
            this.setHealth(50);
        }
    };

    // Move

    Character.prototype.up = function (move) {
        this.keys.up = move;

        if (this.keys.up) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
            this.sprite.col = 3;
        }
    };

    Character.prototype.down = function (move) {
        this.keys.down = move;

        if (this.keys.down) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
            this.sprite.col = 0;
        }
    };

    Character.prototype.left = function (move) {
        this.keys.left = move;

        if (this.keys.left) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
            this.sprite.col = 1;
        }
    };

    Character.prototype.right = function (move) {
        this.keys.right = move;

        if (this.keys.right) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
            this.sprite.col = 2;
        }
    };

    // Config

    Character.prototype.width = function () {
        return this.image.width * 1.5;
    };

    Character.prototype.height = function () {
        return this.image.height * 1.5;
    };

    Character.prototype.currentRowSprite = function () {
        return this.sprite.row * this.image.width;
    };

    Character.prototype.currentColSprite = function () {
        return this.sprite.col * this.image.height;
    };

    Character.prototype.initPos = function () {
        return { x: 1, y: 10 };
    };

    return Character;

});