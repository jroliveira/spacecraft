define([
    'jquery',
    
    'domain/characters/Character'
], function ($, Character) {

    function Soldier(config) {
        this.config = config;

        this.pos = config.pos;
        this.health = config.health;
        this.sprite = config.sprite;

        this.keys = { up: false, down: false, right: false, left: false };

        $(document).on('up', $.proxy(this.lift, this));
        $(document).on('down', $.proxy(this.lower, this));
        $(document).on('left', $.proxy(this.toLeft, this));
        $(document).on('right', $.proxy(this.toRight, this));
    }

    Soldier.prototype = new Character();

    // Direction

    Soldier.prototype.lift = function (event, move) {
        this.keys.up = move;

        if (this.keys.up) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
            this.sprite.col = 3;
        }
    };

    Soldier.prototype.lower = function (event, move) {
        this.keys.down = move;
        
        if (this.keys.down) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
            this.sprite.col = 0;
        }
    };

    Soldier.prototype.toLeft = function (event, move) {
        this.keys.left = move;
        
        if (this.keys.left) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
            this.sprite.col = 1;
        }
    };

    Soldier.prototype.toRight = function (event, move) {
        this.keys.right = move;
        
        if (this.keys.right) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
            this.sprite.col = 2;
        }
    };

    return Soldier;

});