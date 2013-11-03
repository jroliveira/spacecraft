define([], function () {

    var ship = (function () {

        Ship.prototype.width = 43;
        Ship.prototype.height = 39;
        
        Ship.prototype.row = 0;
        Ship.prototype.col = 0;
        
        Ship.prototype.pos = {
            x: 0,
            y: 0
        };

        Ship.prototype.keys = {
            up: false,
            down: false,
            right: false,
            left: false
        };

        function Ship() {
            this.image = new Image();
            this.image.src = "../../client/img/naveSprite.png";
        }

        Ship.prototype.updates = function () {
            if (this.keys.up) {
                this.pos.y -= 2;
                if (this.col <= 0)
                    this.col = 0;
                else
                    this.col--;
            }
            if (this.keys.down) {
                this.pos.y += 2;
                if (this.col >= 2)
                    this.col = 2;
                else
                    this.col++;
            }
            if (this.keys.left) {
                this.pos.x -= 2;
            }
            if (this.keys.right) {
                this.pos.x += 2;
            }
            this.row = (this.row === 2) ? 0 : this.row + 1;
        };

        Ship.prototype.up = function (move) {
            this.keys.up = move;
        };

        Ship.prototype.down = function (move) {
            this.keys.down = move;
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