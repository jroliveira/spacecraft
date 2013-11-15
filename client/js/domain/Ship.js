define([
    'domain/Element'
], function (Element) {

    var ship = (function () {

        function Ship() {
            this.pos = { x: this.initPosX(), y: this.initPosY() };
            
            this.life = this.initLife();
            this.damage = 100;
            
            this.keys = { up: false, down: false, right: false, left: false };

            this.image = { width: 43, height: 39 };
            this.sprite = { row: 0, col: 0 };

            this.imageSprite = new Image();
            this.imageSprite.src = "../../client/img/shipSprite.png";
        }

        Ship.prototype = new Element();

        Ship.prototype.initPosY = function () {
            return 0;
        };

        Ship.prototype.initPosX = function () {
            return 0;
        };

        Ship.prototype.initLife = function () {
            return 10;
        };

        Ship.prototype.currentRowSprite = function () {
            return this.sprite.row * this.image.width;
        };

        Ship.prototype.currentColSprite = function () {
            return this.sprite.col * this.image.height;
        };

        Ship.prototype.width = function () {
            return this.image.width * 2;
        };

        Ship.prototype.height = function () {
            return this.image.height * 2;
        };

        Ship.prototype.draw = function (context) {
            context.drawImage(this.imageSprite, this.currentRowSprite(), this.currentColSprite(), this.image.width, this.image.height, this.pos.x, this.pos.y, this.width(), this.height());
        };

        Ship.prototype.updates = function () {
            if (this.keys.up) {
                if (this.pos.y <= 0) {
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

        return Ship;

    })();

    return ship;

});