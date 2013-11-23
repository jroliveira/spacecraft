define([
    'underscore',

    'infrastructure/background/Background',
    'infrastructure/background/Parallax',

    'common/configs/munitions/BulletConfig',
    'common/configs/munitions/MissileConfig',
    'common/configs/munitions/LaserConfig',
    'common/configs/enemies/AsteroidConfig',
    'common/configs/characters/ShipConfig',
    'common/configs/StarbaseConfig',

    'domain/Entity',
    'domain/scenarios/Scenario',
    'domain/characters/Ship',
    'domain/Starbase',
    'domain/enemies/Asteroid',
    'domain/munitions/Missile',
    'domain/munitions/Bullet',
    'domain/munitions/Laser'
], function (
    _,
    Background,
    Parallax,
    BulletConfig,
    MissileConfig,
    LaserConfig,
    AsteroidConfig,
    ShipConfig,
    StarbaseConfig,
    Entity,
    Scenario,
    Ship,
    Starbase,
    Asteroid,
    Missile,
    Bullet,
    Laser
) {

    function Space($canvas, context) {
        this.$canvas = $canvas;
        this.context = context;

        this.timer = 0;
        this.ended = false;

        this.ship = new Ship(ShipConfig);
        this.startBase = new Starbase(StarbaseConfig);
        this.background = new Background('background1', 2.5);

        this.entities = [];
        this.insertEntity(this.background);
        this.insertEntity(new Parallax('parallax1', 10));
        this.insertEntity(new Parallax('parallax2', 5));
        this.insertEntity(this.ship);
    }

    Space.prototype = new Scenario();

    Space.prototype.updates = function () {
        var self = this;

        if (this.background.ended()) {
            var i = this.entities.indexOf(this.startBase);

            if (i < 0) {
                this.insertEntity(this.startBase);
            } else {
                if (this.startBase.collided(this.ship)) {
                    this.ended = true;
                }
            }
        }

        _.each(this.entities, function (entity) {
            if (entity instanceof Entity) {
                self.detectsCollision(entity);
            }

            entity.updates();
        });

        this.timer++;
        if (this.timer === 200) {
            this.timer = 0;
            this.insertEntity(new Asteroid(AsteroidConfig));
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
                    self.insertEntity(new Bullet(self.ship, BulletConfig));
                    break;
                case 70:
                    self.insertEntity(new Missile(self.ship, MissileConfig));
                    break;
                case 82:
                    self.insertEntity(new Laser(self.ship, LaserConfig));
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
    
    return Space;

});
