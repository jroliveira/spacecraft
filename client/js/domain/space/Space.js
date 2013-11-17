define([
    'underscore',

    'infrastructure/background/Background',
    'infrastructure/background/Parallax',

    'domain/space/Element',
    'domain/space/Ship',
    'domain/space/Starbase',
    'domain/space/enemy/Asteroid',
    'domain/space/ammunition/Missile',
    'domain/space/ammunition/Bullet',
    'domain/space/ammunition/Laser'
], function (_, Background, Parallax, Element, Ship, Starbase, Asteroid, Missile, Bullet, Laser) {

    function Space($canvas, context) {
        this.$canvas = $canvas;
        this.context = context;

        this.timer = 0;
        this.ended = false;

        this.ship = new Ship();
        this.startBase = new Starbase();
        this.background = new Background('background1', 2.5);

        this.elements = [];
        this.insertElement(this.background);
        this.insertElement(new Parallax('parallax1', 10));
        this.insertElement(new Parallax('parallax2', 5));
        this.insertElement(this.ship);
    }

    Space.prototype.draw = function () {
        var self = this;

        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

        _.each(this.elements, function (element) {
            element.draw(self.context);
        });
    };

    Space.prototype.updates = function () {
        var self = this;

        if (this.background.ended()) {
            var i = this.elements.indexOf(this.startBase);

            if (i < 0) {
                this.insertElement(this.startBase);
            } else {
                if (this.startBase.collided(this.ship)) {
                    this.ended = true;
                }
            }
        }

        _.each(this.elements, function (element) {
            if (element instanceof Element) {
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

    Space.prototype.start = function () {
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
    
    Space.prototype.detectsCollision = function (element) {
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
    
    Space.prototype.insertElement = function (element) {
        this.elements.push(element);
    };

    Space.prototype.removeElement = function (element) {
        var i = this.elements.indexOf(element);

        delete this.elements[i];
    };

    return Space;

});
