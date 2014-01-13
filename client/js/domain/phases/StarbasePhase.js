define([
    'jquery',
    'underscore',
    
    'infrastructure/data/Store',

    'domain/phases/Phase',
    'domain/characters/Soldier'
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
