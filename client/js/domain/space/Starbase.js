define([
    'jquery',
    
    'infrastructure/HealthBar',

    'domain/space/Element'
], function ($, HealthBar, Element) {

    function Starbase() {
        this.image = new Image();
        this.image.src = "../../client/img/starbase.png";

        this.pos = { x: 630, y: 450 };

        this.health = 10000;
        this.damage = 0;

        this.healthBar = new HealthBar(this);
    }

    Starbase.prototype = new Element();

    Starbase.prototype.updates = function () { };

    // Damage

    Starbase.prototype.damages = function (damage) { };
    
    // Health

    Starbase.prototype.showHealthBar = function () {
        return false;
    };

    return Starbase;

});