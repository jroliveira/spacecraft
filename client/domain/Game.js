define([
    'underscore',
    'domain/Background',
    'domain/Ship'
], function (_, Background, Ship) {

    var game = (function () {

        function Game($canvas) {
            this.$canvas = $canvas;
            this.context = this.$canvas.getContext('2d');

            this.ship = new Ship();
            this.backgrounds = {
                bg1: new Background('bg1', 2.5),
                bg2: new Background('bg2', 10),
                bg3: new Background('bg3', 5)
            };
        }

        Game.prototype.draw = function () {
            var self = this;

            this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
            _.each(this.backgrounds, function (value, key) {
                self.context.drawImage(value.image, value.pos.x, 0);
                self.context.drawImage(value.image, value.pos.x + value.image.width, 0);
            });

            this.context.drawImage(this.ship.image, this.ship.row * this.ship.width, this.ship.col * this.ship.height, this.ship.width, this.ship.height, this.ship.pos.x, this.ship.pos.y, this.ship.width * 2, this.ship.height * 2);
        };

        Game.prototype.update = function () {
            this.ship.updates();
            _.each(this.backgrounds, function (value, key) {
                value.updates();
            });

            this.draw();
        };

        Game.prototype.start = function () {
            var self = this;

            this.draw();

            $(document).bind('keydown', function (e) {
                e.preventDefault();

                switch (e.keyCode) {
                    case 37:
                        self.ship.left(true);
                        break;
                    case 38:
                        self.ship.up(true);
                        break;
                    case 39:
                        self.ship.right(true);
                        break;
                    case 40:
                        self.ship.down(true);
                        break;
                }
            });

            $(document).bind('keyup', function (e) {
                e.preventDefault();

                switch (e.keyCode) {
                    case 37:
                        self.ship.left(false);
                        break;
                    case 38:
                        self.ship.up(false);
                        break;
                    case 39:
                        self.ship.right(false);
                        break;
                    case 40:
                        self.ship.down(false);
                        break;
                }
            });
        };

        return Game;

    })();

    return game;
});
