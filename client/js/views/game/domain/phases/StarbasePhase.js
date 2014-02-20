define([
    'jquery',
    'underscore',
    
    'views/game/infrastructure/data/Store',
    
    'views/game/common/backgrounds/Background',

    'views/game/domain/phases/Phase',
    'views/game/domain/characters/Soldier'
], function (
    $,
    _,
    
    store,
     
    Background,

    Phase,
    Soldier
) {

    function StarbasePhase(config) {
        var defer = $.Deferred();
        
        this.config = config;
        
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

    StarbasePhase.prototype = new Phase();
    
    return StarbasePhase;

});
