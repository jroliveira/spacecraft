define([
    'infrastructure/HealthBar',

    'domain/characters/Character'
], function (HealthBar, Character) {

    function Soldier(config) {
        this.config = config;

        this.pos = config.pos;
        this.health = config.health;
        this.sprite = config.sprite;

        this.keys = { up: false, down: false, right: false, left: false };

        this.imageSprite = new Image();
        this.imageSprite.src = "../../client/img/characters/soldierSprite.png";
        this.healthBar = new HealthBar(this);
    }

    Soldier.prototype = new Character();

    // Move

    Soldier.prototype.up = function (move) {
        this.keys.up = move;

        if (this.keys.up) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
            this.sprite.col = 3;
        }
    };

    Soldier.prototype.down = function (move) {
        this.keys.down = move;

        if (this.keys.down) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
            this.sprite.col = 0;
        }
    };

    Soldier.prototype.left = function (move) {
        this.keys.left = move;

        if (this.keys.left) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
            this.sprite.col = 1;
        }
    };

    Soldier.prototype.right = function (move) {
        this.keys.right = move;

        if (this.keys.right) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
            this.sprite.col = 2;
        }
    };

    return Soldier;

});