define([
    'jquery',

    'views/game/infrastructure/data/Store',

    'views/game/domain/characters/Character',
    'views/game/domain/projectiles/Projectile'
], function (
    $,

    store,

    Character,
    Projectile
) {

    function Ship(config) {
        this.config = config;

        this.pos = config.pos;
        this.health = config.health;
        this.sprite = config.sprite;

        this.keys = { up: false, down: false, right: false, left: false };

        $(document).on('up', $.proxy(this.lift, this));
        $(document).on('down', $.proxy(this.lower, this));
        $(document).on('left', $.proxy(this.toLeft, this));
        $(document).on('right', $.proxy(this.toRight, this));

        $(document).on('space', $.proxy(this.firstLaunch, this));
        $(document).on('f', $.proxy(this.secondLaunch, this));
    }

    Ship.prototype = new Character();

    Ship.prototype.moves = function () {
        if (this.iCanMove() === false) return;

        this.sprite.col = (this.sprite.col === 2) ? 0 : this.sprite.col + 1;
    };

    Ship.prototype.stop = function () {
        this.sprite.col = 0;
    };

    // Direction

    Ship.prototype.lift = function (event, move) {
        this.keys.up = move;

        if (move)
            this.sprite.row = (this.sprite.row <= 0) ? 0 : this.sprite.row - 1;
    };

    Ship.prototype.lower = function (event, move) {
        this.keys.down = move;

        if (move)
            this.sprite.row = (this.sprite.row >= 2) ? 2 : this.sprite.row + 1;
    };

    Ship.prototype.toLeft = function (event, move) {
        this.keys.left = move;
    };

    Ship.prototype.toRight = function (event, move) {
        this.keys.right = move;
    };

    // Munitions

    Ship.prototype.firstLaunch = function (event, pressed) {
        if (!pressed) return;

        var self = this;

        store.getBy('projectiles', this.config.projectiles.first, function (data) {
            var munition = new Projectile(data, self);

            $(self).trigger('shot', [munition]);
        });
    };

    Ship.prototype.secondLaunch = function (event, pressed) {
        if (!pressed) return;

        var self = this;

        store.getBy('projectiles', this.config.projectiles.second, function (data) {
            var munition = new Projectile(data, self);

            $(self).trigger('shot', [munition]);
        });
    };

    // Config

    Ship.prototype.initPosShot = function () {
        var posX = this.pos.x + (this.config.width + 5);
        var posY = this.pos.y + (this.config.height / 2);

        return { x: posX, y: posY };
    };

    return Ship;

});