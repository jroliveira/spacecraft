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
        this.timeToMove = 0;

        $(document).on('up', $.proxy(this.lift, this));
        $(document).on('down', $.proxy(this.lower, this));
        $(document).on('left', $.proxy(this.toLeft, this));
        $(document).on('right', $.proxy(this.toRight, this));
    }

    Soldier.prototype = new Character();

    Soldier.prototype.moves = function () {
        if (this.iCanMove() === false) {
            return;
        }
        
        if (this.sprite.col === 2) {
            this.sprite.col = 0;
        } else {
            this.sprite.col++;
        }
    };

    Soldier.prototype.stop = function () {
        this.sprite.col = 1;
    };

    // Direction

    Soldier.prototype.lift = function (event, move) {
        this.keys.up = move;

        if (move) {
            this.moves();

            this.sprite.row = 3;
        } else {
            this.stop();
        }
    };

    Soldier.prototype.lower = function (event, move) {
        this.keys.down = move;

        if (move) {
            this.moves();

            this.sprite.row = 0;
        } else {
            this.stop();
        }
    };

    Soldier.prototype.toLeft = function (event, move) {
        this.keys.left = move;

        if (move) {
            this.moves();

            this.sprite.row = 1;
        } else {
            this.stop();
        }
    };

    Soldier.prototype.toRight = function (event, move) {
        this.keys.right = move;

        if (this.keys.right) {
            this.moves();

            this.sprite.row = 2;
        } else {
            this.stop();
        }
    };

    return Soldier;

});