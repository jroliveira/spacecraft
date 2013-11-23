define([
    'jquery',
    
    'infrastructure/HealthBar',

    'domain/Entity'
], function ($, HealthBar, Entity) {

    function Starbase(config) {
        this.config = config;

        this.pos = config.pos;
        this.health = config.health;

        this.image = new Image();
        this.image.src = "../../client/img/starbase.png";
        this.healthBar = new HealthBar(this);
    }

    Starbase.prototype = new Entity();

    Starbase.prototype.updates = function () { };

    // Damage

    Starbase.prototype.damages = function (damage) { };
    
    // Health

    Starbase.prototype.showHealthBar = function () {
        return false;
    };

    return Starbase;

});