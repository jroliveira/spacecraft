define([
    'jquery',
    'underscore',
    
    'views/game/infrastructure/data/Store',

    'views/game/domain/phases/Phase',
    'views/game/domain/characters/Soldier'
], function (
    $,
    _,
    
    store,

    Phase,
    Soldier
) {

    function StarbasePhase(config) {
        var defer = $.Deferred();
        
        this.config = config;
        
        var self = this;

        store.getBy('characters', config.character.type, function (data) {
            var type = eval(data.type);
            self.character = new type(data);

            defer.resolve();
        });

        this.phase = new config.phase.type(config.phase.config);
        this.entities = [];
    }

    StarbasePhase.prototype = new Phase();
    
    return StarbasePhase;

});
