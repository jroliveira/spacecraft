define([
    'jquery',

    'common/configs/projectiles/BulletConfig',
    'common/configs/projectiles/MissileConfig',
    'common/configs/projectiles/LaserConfig',

    'domain/characters/Character',
    'domain/projectiles/Projectile'
], function (
    $,

    BulletConfig,
    MissileConfig,
    LaserConfig,

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

        $(document).on('space', $.proxy(this.shootBullets, this));
        $(document).on('f', $.proxy(this.missileLaunch, this));
        $(document).on('r', $.proxy(this.laserShooting, this));
    }

    Ship.prototype = new Character();

    // Munitions

    Ship.prototype.missileLaunch = function (event, pressed) {
        if (!pressed) return;

        var munition = new Projectile(MissileConfig, this);

        $(this).trigger('shot', [munition]);
    };

    Ship.prototype.laserShooting = function (event, pressed) {
        if (!pressed) return;

        var munition = new Projectile(LaserConfig, this);

        $(this).trigger('shot', [munition]);
    };

    Ship.prototype.shootBullets = function (event, pressed) {
        if (!pressed) return;

        var munition = new Projectile(BulletConfig, this);

        $(this).trigger('shot', [munition]);
    };

    // Direction

    Ship.prototype.lift = function (event, move) {
        this.keys.up = move;

        if (move) {
            if (this.sprite.row <= 0) {
                this.sprite.row = 0;
            } else {
                this.sprite.row--;
            }
        }
    };

    Ship.prototype.lower = function (event, move) {
        this.keys.down = move;

        if (move) {
            if (this.sprite.row >= 2)
                this.sprite.row = 2;
            else
                this.sprite.row++;
        }
    };

    Ship.prototype.toLeft = function (event, move) {
        this.keys.left = move;
    };

    Ship.prototype.toRight = function (event, move) {
        this.keys.right = move;
    };

    // Config

    Ship.prototype.initPosShot = function () {
        var posX = this.pos.x + (this.config.width + 5);
        var posY = this.pos.y + (this.config.height / 2);

        return { x: posX, y: posY };
    };

    return Ship;

});