define([
    'jquery',
    
    'infrastructure/HealthBar',

    'domain/characters/Character'
], function ($, HealthBar, Character) {

    function Soldier(config) {
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
        this.imageSprite.src = "../../client/img/characters/soldierSprite.png";
        this.healthBar = new HealthBar(this);
    }

    Soldier.prototype = new Character();

    // Move

    Soldier.prototype.lift = function (event) {
        var self = event.target;

        if (self.keys.up) {
            self.sprite.row = (self.sprite.row === 2) ? 0 : self.sprite.row + 1;
            self.sprite.col = 3;
        }
    };

    Soldier.prototype.lower = function (event) {
        var self = event.target;

        if (self.keys.down) {
            self.sprite.row = (self.sprite.row === 2) ? 0 : self.sprite.row + 1;
            self.sprite.col = 0;
        }
    };

    Soldier.prototype.toLeft = function (event) {
        var self = event.target;

        if (self.keys.left) {
            self.sprite.row = (self.sprite.row === 2) ? 0 : self.sprite.row + 1;
            self.sprite.col = 1;
        }
    };

    Soldier.prototype.toRight = function (event) {
        var self = event.target;

        if (self.keys.right) {
            self.sprite.row = (self.sprite.row === 2) ? 0 : self.sprite.row + 1;
            self.sprite.col = 2;
        }
    };

    return Soldier;

});