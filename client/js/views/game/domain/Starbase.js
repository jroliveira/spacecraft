define([
    'jquery',
    
    'views/game/domain/Entity',
    'views/game/domain/characters/Character'
], function ($, Entity, Character) {

    function Starbase(config) {
        this.config = config;

        this.pos = config.pos;
    }

    Starbase.prototype = new Entity();

    Starbase.prototype.resolvesCollision = function (obstacle) {
        if (obstacle instanceof Character) {
            $(document).trigger('phaseEnded');
        }
    };

    return Starbase;

});