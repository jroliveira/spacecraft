define([
    'jquery',
    
    'common/configs/characters/SoldierConfig',

    'domain/phases/Phase',
    'domain/characters/Soldier'
], function ($, SoldierConfig, Phase, Soldier) {

    function StarbasePhase(config) {
        this.config = config;
        
        this.entities = [];

        this.character = new Soldier(SoldierConfig);
    }

    StarbasePhase.prototype = new Phase();
    
    StarbasePhase.prototype.start = function () {
        this.insertEntity(this.character);
    };
    
    return StarbasePhase;

});
