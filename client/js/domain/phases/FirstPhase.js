define([
    'jquery',

    'infrastructure/data/Store',

    'common/configs/StarbaseConfig',

    'domain/phases/Phase',
    'domain/Starbase',
    'domain/enemies/Asteroid'
], function (
    $,

    Store,

    StarbaseConfig,

    Phase,
    Starbase,
    Asteroid
) {

    function FirstPhase(config) {
        this.config = config;

        this.timer = 0;

        this.entities = [];

        this.character = new config.entities.character.entity(config.entities.character.config);
        $(this.character).on('shot', $.proxy(this.shoot, this));

        this.background = new config.entities.background.entity(config.entities.background.config);
        $(this.background).on('ended', $.proxy(this.showStarbase, this));

        $(this).on('updated', $.proxy(this.enterEnemy, this));
    }

    FirstPhase.prototype = new Phase();

    FirstPhase.prototype.start = function () {
        this.insertEntity(this.background);
        this.insertEntity(new this.config.entities.effect01.entity(this.config.entities.effect01.config));
        this.insertEntity(new this.config.entities.effect02.entity(this.config.entities.effect02.config));
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
