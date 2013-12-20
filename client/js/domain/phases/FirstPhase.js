define([
    'jquery',
    
    'infrastructure/data/Store',

    'common/configs/StarbaseConfig',
    'common/configs/characters/ShipConfig',
    'common/configs/effects/ParallaxOneConfig',
    'common/configs/effects/ParallaxTwoConfig',
    'common/configs/effects/MovingBackgroundOneConfig',

    'common/effects/MovingBackground',
    'common/effects/Parallax',

    'domain/phases/Phase',
    'domain/Starbase',
    'domain/characters/Ship',
    'domain/enemies/Asteroid'
], function (
    $,

    Store,

    StarbaseConfig,
    ShipConfig,
    ParallaxOneConfig,
    ParallaxTwoConfig,
    MovingBackgroundOneConfig,

    MovingBackground,
    Parallax,

    Phase,
    Starbase,
    Ship,
    Asteroid
) {

    function FirstPhase(config) {
        this.config = config;

        this.timer = 0;

        this.entities = [];

        this.character = new Ship(ShipConfig);
        $(this.character).on('shot', $.proxy(this.shoot, this));

        this.background = new MovingBackground(MovingBackgroundOneConfig);
        $(this.background).on('phaseEnded', $.proxy(this.showStarbase, this));

        $(this).on('updated', $.proxy(this.enterEnemy, this));
    }

    FirstPhase.prototype = new Phase();

    FirstPhase.prototype.start = function () {
        this.insertEntity(this.background);
        this.insertEntity(new Parallax(ParallaxOneConfig));
        this.insertEntity(new Parallax(ParallaxTwoConfig));
        this.insertEntity(this.character);
    };

    FirstPhase.prototype.enterEnemy = function (event) {
        var self = event.target;

        self.timer++;
        if (self.timer === 200) {
            self.timer = 0;

            Store.getBy('enemies', 'asteroid', function (data) {
                self.threaten(new Asteroid(data));
            });
        }
    };

    FirstPhase.prototype.threaten = function (enemy) {
        $(enemy).on('destroy', $.proxy(this.removeEntity, this));

        this.insertEntity(enemy);
    };

    FirstPhase.prototype.shoot = function (event, projectile) {
        $(projectile).on('destroy', $.proxy(this.removeEntity, this));

        this.insertEntity(projectile);
    };

    FirstPhase.prototype.showStarbase = function () {
        this.insertEntity(new Starbase(StarbaseConfig));
    };

    return FirstPhase;

});
