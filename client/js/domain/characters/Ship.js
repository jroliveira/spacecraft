define([
    'jquery',
    
    'infrastructure/HealthBar',

    'domain/characters/Character'
], function ($, HealthBar, Character) {

    function Ship(config) {
        this.config = config;

        this.pos = config.pos;
        this.health = config.health;
        this.sprite = config.sprite;

        this.keys = { up: false, down: false, right: false, left: false };

        $(this).on('upMove', this.lift);
        $(this).on('downMove', this.lower);
        $(this).on('rightMove', this.toRight);
        $(this).on('leftMove', this.toLeft);

        this.imageSprite = new Image();
        this.imageSprite.src = "../../client/img/characters/shipSprite.png";
        this.healthBar = new HealthBar(this);
    }

    Ship.prototype = new Character();

    // Move

    Ship.prototype.lift = function (event) {
        var self = event.target;

        if (self.keys.up) {
            self.sprite.row = (self.sprite.row === 2) ? 0 : self.sprite.row + 1;

            if (self.sprite.col <= 0) {
                self.sprite.col = 0;
            } else {
                self.sprite.col--;
            }
        }
    };

    Ship.prototype.lower = function (event) {
        var self = event.target;

        if (self.keys.down) {
            self.sprite.row = (self.sprite.row === 2) ? 0 : self.sprite.row + 1;

            if (self.sprite.col >= 2)
                self.sprite.col = 2;
            else
                self.sprite.col++;
        }
    };

    Ship.prototype.toLeft = function (event) {
        var self = event.target;

        if (self.keys.left) {
            self.sprite.row = (self.sprite.row === 2) ? 0 : self.sprite.row + 1;
        }
    };

    Ship.prototype.toRight = function (event) {
        var self = event.target;

        if (self.keys.right) {
            self.sprite.row = (self.sprite.row === 2) ? 0 : self.sprite.row + 1;
        }
    };

    // Config

    Ship.prototype.initPosShot = function () {
        var posX = this.pos.x + (this.config.width + 5);
        var posY = this.pos.y + (this.config.height / 2);

        return { x: posX, y: posY };
    };

    return Ship;

});