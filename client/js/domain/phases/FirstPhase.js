define([
    'jquery',
    'underscore',

    'infrastructure/data/Store',

    'common/configs/StarbaseConfig',

    'domain/phases/Phase',
    'domain/Starbase',
    'domain/enemies/Asteroid'
], function (
    $,
    _,

    store,

    StarbaseConfig,

    Phase,
    Starbase,
    Asteroid
) {

    function FirstPhase(config) {
        this.config = config;
        this.timer = 0;

        this.entities = [];
        
        this.character = new config.character.type(config.character.config);
        this.phase = new config.phase.type(config.phase.config);
    }

    FirstPhase.prototype = new Phase();

    FirstPhase.configure = function () {
        $(this.phase).on('ended', $.proxy(this.showStarbase, this));
        $(this.character).on('shot', $.proxy(this.shoot, this));
        
        $(this).on('updated', $.proxy(this.enterEnemy, this));
    };

    FirstPhase.prototype.start = function () {
        var self = this;
        
        this.insertEntity(this.phase);
        _.each(this.config.entities, function (entity) {
            self.insertEntity(new entity.type(entity.config));
        });
        
        this.insertEntity(this.character);
    };

    FirstPhase.prototype.enterEnemy = function (event) {
        var self = event.target;

        self.timer++;
        if (self.timer === 200) {
            self.timer = 0;

            store.getBy('enemies', 'asteroid', function (data) {
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
