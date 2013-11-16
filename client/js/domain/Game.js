define([
    'underscore',

    'infrastructure/Background',

    'domain/Element',
    'domain/Ship',
    'domain/enemy/Asteroid',
    'domain/ammunition/Missile',
    'domain/ammunition/Bullet',
    'domain/ammunition/Laser'
], function (_, Background, Element, Ship, Asteroid, Missile, Bullet, Laser) {

    function Game($canvas) {
        this.$canvas = $canvas;
        this.context = this.$canvas.getContext('2d');

        this.timer = 0;

        this.ship = new Ship();

        this.elements = [];
        this.insertElement(new Background('bg1', 2.5));
        this.insertElement(new Background('bg2', 10));
        this.insertElement(new Background('bg3', 5));
        this.insertElement(this.ship);
    }

    Game.prototype.draw = function () {
        var self = this;

        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

        _.each(this.elements, function (element) {
            element.draw(self.context);
        });
    };

    Game.prototype.updates = function () {
        var self = this;

        _.each(this.elements, function (element) {
            if (element instanceof Element) {
                if (element.destroyed()) {
                    
                }

                self.detectsCollision(element);
            }

            element.updates();
        });

        this.timer++;
        if (this.timer === 200) {
            this.timer = 0;
            this.insertElement(new Asteroid());
        }

        this.draw();
    };

    Game.prototype.start = function () {
        var self = this;

        this.draw();

        $(document).bind('keydown', function (e) {
            e.preventDefault();

            switch (e.keyCode) {
                case 32:
                    self.insertElement(new Bullet(self.ship));
                    break;
                case 70:
                    self.insertElement(new Missile(self.ship));
                    break;
                case 82:
                    self.insertElement(new Laser(self.ship));
                    break;
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
    
    // Collision
    
    Game.prototype.detectsCollision = function (element) {
        var self = this;

        if (element.destroyed()) {
            this.removeElement(element);
            return;
        }

        _.each(this.elements, function (obstacle) {
            if ((obstacle instanceof Element) && (obstacle != element)) {
                if (element.collided(obstacle)) {
                    element.damages(obstacle.damage);
                    if (element.destroyed()) {
                        self.removeElement(element);
                    }

                    obstacle.damages(element.damage);
                    if (obstacle.destroyed()) {
                        self.removeElement(obstacle);
                    }
                }
            }
        });
    };

    
    // Config
    
    Game.prototype.insertElement = function (element) {
        this.elements.push(element);
    };

    Game.prototype.removeElement = function (element) {
        var i = this.elements.indexOf(element);

        delete this.elements[i];
    };

    return Game;

});
