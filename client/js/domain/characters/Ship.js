define([
    'jquery',
    
    'common/configs/munitions/BulletConfig',
    'common/configs/munitions/MissileConfig',
    'common/configs/munitions/LaserConfig',

    'domain/characters/Character',
    'domain/munitions/Missile',
    'domain/munitions/Bullet',
    'domain/munitions/Laser'
], function (
    $,
    
    BulletConfig,
    MissileConfig,
    LaserConfig,

    Character,
    Missile,
    Bullet,
    Laser
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

        var munition = new Missile(MissileConfig, this);
        
        $(this).trigger('shot', [munition]);
    };

    Ship.prototype.laserShooting = function (event, pressed) {
        if (!pressed) return;

        var munition = new Laser(LaserConfig, this);
        
        $(this).trigger('shot', [munition]);
    };

    Ship.prototype.shootBullets = function (event, pressed) {
        if (!pressed) return;

        var munition = new Bullet(BulletConfig, this);
        
        $(this).trigger('shot', [munition]);
    };

    // Direction

    Ship.prototype.lift = function (event, move) {
        this.keys.up = move;

        if (move) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;

            if (this.sprite.col <= 0) {
                this.sprite.col = 0;
            } else {
                this.sprite.col--;
            }
        }
    };

    Ship.prototype.lower = function (event, move) {
        this.keys.down = move;
        
        if (move) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;

            if (this.sprite.col >= 2)
                this.sprite.col = 2;
            else
                this.sprite.col++;
        }
    };

    Ship.prototype.toLeft = function (event, move) {
        this.keys.left = move;
        
        if (move) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
        }
    };

    Ship.prototype.toRight = function (event, move) {
        this.keys.right = move;
        
        if (move) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
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