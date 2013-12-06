define([
    'jquery',

    'infrastructure/inputs/Keyboard',
    'infrastructure/background/Background',
    
    'common/configs/enemies/AsteroidConfig',
    'common/configs/characters/ShipConfig',
    'common/configs/StarbaseConfig',
    'common/configs/phases/PhaseOneConfig',
    'common/configs/effects/ParallaxOneConfig',
    'common/configs/effects/ParallaxTwoConfig',

    'domain/effects/Parallax',
    'domain/scenarios/Scenario',
    'domain/characters/Ship',
    'domain/Starbase',
    'domain/enemies/Asteroid'
], function (
    $,

    Keyboard,
    Background,
    
    AsteroidConfig,
    ShipConfig,
    StarbaseConfig,
    PhaseOneConfig,
    ParallaxOneConfig,
    ParallaxTwoConfig,

    Parallax,
    Scenario,
    Ship,
    Starbase,
    Asteroid
) {

    function Space(context, config) {
        this.config = config;
        
        this.context = context;
        
        this.timer = 0;

        this.character = new Ship(ShipConfig);
        this.background = new Background(PhaseOneConfig);
        this.starBase = new Starbase(StarbaseConfig);

        this.components = [];

        this.entities = [];
        this.insertEntity(this.background);
        this.insertEntity(new Parallax(ParallaxOneConfig));
        this.insertEntity(new Parallax(ParallaxTwoConfig));
        this.insertEntity(this.character);

        this.input = new Keyboard();

        $(this.character).on('shot', $.proxy(this.shoot, this));
        $(this.background).on('scenarioEnded', $.proxy(this.showStarbase, this));
        $(this).on('updated', this.enterEnemy);
    }

    Space.prototype = new Scenario();

    Space.prototype.enterEnemy = function(event) {
        var self = event.target;

        self.timer++;
        if (self.timer === 200) {
            self.timer = 0;

            self.threaten(new Asteroid(AsteroidConfig, self));
        }
    };

    Space.prototype.showStarbase = function () {
        var i = this.entities.indexOf(this.starBase);
        if (i < 0) {
            this.insertEntity(this.starBase);
        }
    };

    return Space;

});
