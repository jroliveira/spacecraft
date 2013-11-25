define([
    'jquery',
    'underscore',

    'infrastructure/inputs/Keyboard',
    'infrastructure/background/Background',
    'infrastructure/background/Parallax',

    'common/configs/munitions/BulletConfig',
    'common/configs/munitions/MissileConfig',
    'common/configs/munitions/LaserConfig',
    'common/configs/enemies/AsteroidConfig',
    'common/configs/characters/ShipConfig',
    'common/configs/StarbaseConfig',
    'common/configs/phases/FaseOneConfig',

    'domain/Entity',
    'domain/scenarios/Scenario',
    'domain/characters/Ship',
    'domain/Starbase',
    'domain/enemies/Asteroid',
    'domain/munitions/Missile',
    'domain/munitions/Bullet',
    'domain/munitions/Laser'
], function (
    $,
    _,

    Keyboard,
    Background,
    Parallax,

    BulletConfig,
    MissileConfig,
    LaserConfig,
    AsteroidConfig,
    ShipConfig,
    StarbaseConfig,
    FaseOneConfig,

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

        this.character = new Ship(ShipConfig);
        this.startBase = new Starbase(StarbaseConfig, this);
        this.background = new Background(FaseOneConfig, this);

        this.entities = [];
        this.insertEntity(this.background);
        this.insertEntity(new Parallax('parallax1', 10));
        this.insertEntity(new Parallax('parallax2', 5));
        this.insertEntity(this.character);

        this.input = new Keyboard(this);

        $(this.input).on('space', this.shootBullets);
        $(this.input).on('f', this.missileLaunch);
        $(this.input).on('r', this.laserShooting);

        $(this.input).on('up', this.upCharacter);
        $(this.input).on('down', this.downCharacter);
        $(this.input).on('left', this.leftCharacter);
        $(this.input).on('right', this.rightCharacter);

        $(this.background).on('scenarioEnded', this.showStarbase);
        $(this.startBase).on('phaseEnded', this.ended);

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

    Space.prototype.ended = function(event) {
        var owner = event.target.owner;
        
        $(owner).trigger('phaseEnded');
    };

    Space.prototype.showStarbase = function(event) {
        var owner = event.target.owner;

        var i = owner.entities.indexOf(owner.startBase);
        if (i < 0) {
            owner.insertEntity(owner.startBase);
        }
    };

    // Direction
    
    Space.prototype.upCharacter = function (event, pressed) {
        var self = event.target.owner;

        self.character.up(pressed);
    };

    Space.prototype.downCharacter = function (event, pressed) {
        var self = event.target.owner;

        self.character.down(pressed);
    };

    Space.prototype.leftCharacter = function (event, pressed) {
        var self = event.target.owner;

        self.character.left(pressed);
    };
    
    Space.prototype.rightCharacter = function (event, pressed) {
        var self = event.target.owner;

        self.character.right(pressed);
    };

    // Munitions

    Space.prototype.missileLaunch = function (event) {
        var self = event.target.owner;

        self.shoot(new Missile(MissileConfig, self));
    };

    Space.prototype.laserShooting = function (event) {
        var self = event.target.owner;

        self.shoot(new Laser(LaserConfig, self));
    };

    Space.prototype.shootBullets = function(event) {
        var self = event.target.owner;
        
        self.shoot(new Bullet(BulletConfig, self));
    };

    return Space;

});
