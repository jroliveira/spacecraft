define([
    'jquery',
    
    'domain/Entity',
    'domain/characters/Character'
], function ($, Entity, Character) {

    function Starbase(config) {
        this.config = config;

        this.pos = config.pos;
        
        $(this).on('collided', this.phaseEnded);
    }

    Starbase.prototype = new Entity();

    Starbase.prototype.phaseEnded = function (event, obstacle) {
        if (obstacle instanceof Character) {
            $(document).trigger('phaseEnded');
        }
    };

    return Starbase;

});