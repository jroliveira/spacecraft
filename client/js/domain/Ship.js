define([
    'infrastructure/HealthBar',

    'domain/Element'
], function (HealthBar, Element) {

    function Ship() {
        this.imageSprite = new Image();
        this.imageSprite.src = "../../client/img/shipSprite.png";
        
        this.pos = { x: 10, y: 10 };

        this.health = 50;
        this.damage = 100;

        this.keys = { up: false, down: false, right: false, left: false };

        this.image = { width: 43, height: 39 };
        this.sprite = { row: 0, col: 0 };

        this.healthBar = new HealthBar(this);
    }

    Ship.prototype = new Element();

    Ship.prototype.draw = function (context) {
        this.healthBar.draw(context);
        
        context.drawImage(this.imageSprite, this.currentRowSprite(), this.currentColSprite(), this.image.width, this.image.height, this.pos.x, this.pos.y, this.width(), this.height());
    };

    Ship.prototype.updates = function () {
        if (this.keys.up) {
            if (this.pos.y <= 10) {
                return;
            }

            this.pos.y -= 2;
        }
        if (this.keys.down) {
            if ((this.pos.y + this.height()) >= 600) {
                return;
            }

            this.pos.y += 2;
        }
        if (this.keys.left) {
            if (this.pos.x <= 0) {
                return;
            }

            this.pos.x -= 2;
        }
        if (this.keys.right) {
            if ((this.pos.x + this.width()) >= 895) {
                return;
            }

            this.pos.x += 2;
        }

        this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
    };
    
    // Damage
    
    Ship.prototype.damages = function (damage) {
        var health = this.health - damage;
        this.setHealth(health);

        if (this.destroyed()) {
            this.pos.x = 0;
            this.pos.y = 0;
            this.setHealth(50);
        }
    };
    
    // Move

    Ship.prototype.up = function (move) {
        this.keys.up = move;

        if (this.keys.up) {
            if (this.sprite.col <= 0)
                this.sprite.col = 0;
            else
                this.sprite.col--;
        }
    };

    Ship.prototype.down = function (move) {
        this.keys.down = move;

        if (this.keys.down) {
            if (this.sprite.col >= 2)
                this.sprite.col = 2;
            else
                this.sprite.col++;
        }
    };

    Ship.prototype.left = function (move) {
        return this.keys.left = move;
    };

    Ship.prototype.right = function (move) {
        return this.keys.right = move;
    };
    
    // Config

    Ship.prototype.width = function () {
        return this.image.width * 1.5;
    };

    Ship.prototype.height = function () {
        return this.image.height * 1.5;
    };

    Ship.prototype.currentRowSprite = function () {
        return this.sprite.row * this.image.width;
    };

    Ship.prototype.currentColSprite = function () {
        return this.sprite.col * this.image.height;
    };

    Ship.prototype.initPosShot = function () {
        var posX = this.pos.x + (this.width() + 5);
        var posY = this.pos.y + (this.height() / 2);

        return { x: posX, y: posY };
    };

    return Ship;

});