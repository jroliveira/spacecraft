define([
    'jquery',
    
    'infrastructure/HealthBar',

    'domain/Entity',
    'domain/characters/Character'
], function ($, HealthBar, Entity, Character) {

    function Starbase(config, owner) {
        this.config = config;

        this.owner = owner;
        this.pos = config.pos;
        this.health = config.health;

        this.image = new Image();
        this.image.src = "../../client/img/starbase.png";
        this.healthBar = new HealthBar(this);
    }

    Starbase.prototype = new Entity();

    Starbase.prototype.updates = function () { };

    // Damage

    Starbase.prototype.damages = function (obstacle) {
        if (obstacle instanceof Character) {
            $(this).trigger('phaseEnded');
        }
    };
    
    // Health

    Starbase.prototype.showHealthBar = function () {
        return false;
    };

    return Starbase;

});