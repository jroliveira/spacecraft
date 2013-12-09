define([
    'jquery',

    'common/configs/StarbaseConfig',
    'common/configs/enemies/AsteroidConfig',
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

    StarbaseConfig,
    AsteroidConfig,
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

        this.character = new Ship(ShipConfig);
        $(this.character).on('shot', $.proxy(this.shoot, this));
        
        this.background = new MovingBackground(MovingBackgroundOneConfig);
        $(this.background).on('phaseEnded', $.proxy(this.showStarbase, this));
        
        this.entities = [];
        this.insertEntity(this.background);
        this.insertEntity(new Parallax(ParallaxOneConfig));
        this.insertEntity(new Parallax(ParallaxTwoConfig));
        this.insertEntity(this.character);
        
        $(this).on('updated', this.enterEnemy);
    }

    FirstPhase.prototype = new Phase();

    FirstPhase.prototype.enterEnemy = function (event) {
        var self = event.target;

        self.timer++;
        if (self.timer === 200) {
            self.timer = 0;

            self.threaten(new Asteroid(AsteroidConfig, self));
        }
    };

    FirstPhase.prototype.threaten = function (enemy) {
        $(enemy).on('destroy', $.proxy(this.removeEntity, this));

        this.insertEntity(enemy);
    };

    FirstPhase.prototype.shoot = function (event, munition) {
        $(munition).on('destroy', $.proxy(this.removeEntity, this));

        this.insertEntity(munition);
    };

    FirstPhase.prototype.showStarbase = function () {
        this.insertEntity(new Starbase(StarbaseConfig));
    };

    return FirstPhase;

});
