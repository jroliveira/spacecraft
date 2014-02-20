define([
    'jquery',
    'underscore',

    'views/game/infrastructure/data/Store',
    
    'views/game/common/backgrounds/MovingBackground',

    'views/game/domain/phases/Phase',
    'views/game/domain/Starbase',
    'views/game/domain/enemies/Asteroid',
    'views/game/domain/characters/Ship'
], function (
    $,
    _,

    store,

    MovingBackground,

    Phase,
    Starbase,
    Asteroid,
    Ship
) {

    function FirstPhase(config) {
        var defer = $.Deferred();
        
        this.config = config;
        this.timer = 0;

        var self = this;

        $.when(
        
            store.getBy('characters', config.character.type, function (data) {
                var type = eval(data.type);
                self.character = new type(data);
            }),
            
            store.getBy('backgrounds', config.phase.config, function(data) {
                var type = eval(data.type);
                self.phase = new type(data);
            })
            
        ).then(function () {
            
            defer.resolve();
            
        });

        this.entities = [];
    }

    FirstPhase.prototype = new Phase();

    FirstPhase.prototype.configure = function () {
        $(this.phase).on('ended', $.proxy(this.showStarbase, this));
        $(this.character).on('shot', $.proxy(this.shoot, this));
        
        $(this).on('updated', $.proxy(this.enterEnemy, this));
    };

    FirstPhase.prototype.enterEnemy = function (event) {
        var self = event.target;

        self.timer++;
        if (self.timer === 200) {
            self.timer = 0;

            store.getBy('enemies', 'asteroid', function (data) {
                self.insertEntity(new Asteroid(data));
            });
        }
    };

    FirstPhase.prototype.shoot = function (event, projectile) {
        this.insertEntity(projectile);
    };

    FirstPhase.prototype.showStarbase = function () {
        var self = this;
        
        store.getBy('entities', 'starbase', function (data) {
            self.insertEntity(new Starbase(data));
        });
    };

    return FirstPhase;

});
