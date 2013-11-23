define([
    'infrastructure/HealthBar',

    'domain/characters/Character'
], function (HealthBar, Character) {

    function Ship(config) {
        this.config = config;
        
        this.pos = config.pos;
        this.health = config.health;
        this.sprite = config.sprite;

        this.keys = { up: false, down: false, right: false, left: false };

        this.imageSprite = new Image();
        this.imageSprite.src = "../../client/img/characters/shipSprite.png";
        this.healthBar = new HealthBar(this);
    }

    Ship.prototype = new Character();

    // Move

    Ship.prototype.up = function (move) {
        this.keys.up = move;

        if (this.keys.up) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
            
            if (this.sprite.col <= 0)
                this.sprite.col = 0;
            else
                this.sprite.col--;
        }
    };

    Ship.prototype.down = function (move) {
        this.keys.down = move;

        if (this.keys.down) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
            
            if (this.sprite.col >= 2)
                this.sprite.col = 2;
            else
                this.sprite.col++;
        }
    };

    Ship.prototype.left = function (move) {
        this.keys.left = move;

        if (this.keys.left) {
            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
        }
    };

    Ship.prototype.right = function (move) {
        this.keys.right = move;
        
        if (this.keys.right) {
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