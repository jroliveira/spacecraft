define([
    'infrastructure/HealthBar',

    'domain/Player'
], function (HealthBar, Player) {

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

    Character.prototype = new Player();

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

    return Character;

});