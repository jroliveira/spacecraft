define([
    'jquery',
    'underscore',

    'infrastructure/inputs/Keyboard',
    'infrastructure/background/Background',
    'infrastructure/background/Parallax',

    'common/configs/enemies/AsteroidConfig',
    'common/configs/characters/ShipConfig',
    'common/configs/StarbaseConfig',
    'common/configs/phases/FaseOneConfig',

    'domain/Entity',
    'domain/scenarios/Scenario',
    'domain/characters/Ship',
    'domain/Starbase',
    'domain/enemies/Asteroid'
], function (
    $,
    _,

    Keyboard,
    Background,
    Parallax,

    AsteroidConfig,
    ShipConfig,
    StarbaseConfig,
    FaseOneConfig,

    Entity,
    Scenario,
    Ship,
    Starbase,
    Asteroid
) {

    function Space($canvas, context) {
        this.$canvas = $canvas;
        this.context = context;
        
        this.timer = 0;

        this.character = new Ship(ShipConfig);
        this.startBase = new Starbase(StarbaseConfig, this);
        this.background = new Background(FaseOneConfig, this);

        this.entities = [];
        this.insertEntity(this.background);
        this.insertEntity(new Parallax('parallax1', 10));
        this.insertEntity(new Parallax('parallax2', 5));
        this.insertEntity(this.character);

        this.input = new Keyboard();

        $(this.character).on('shot', $.proxy(this.shoot, this));
        $(this.background).on('scenarioEnded', this.showStarbase);
        $(this).on('update', this.enterEnemy);
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

    Space.prototype.showStarbase = function(event) {
        var owner = event.target.owner;

        var i = owner.entities.indexOf(owner.startBase);
        if (i < 0) {
            owner.insertEntity(owner.startBase);
        }
    };

    return Space;

});
