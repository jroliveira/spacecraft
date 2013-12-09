define([
    'jquery',
    
    'common/configs/characters/SoldierConfig',

    'domain/phases/Phase',
    'domain/characters/Soldier'
], function ($, SoldierConfig, Phase, Soldier) {

    function StarbasePhase(config) {
        this.config = config;
        
        this.character = new Soldier(SoldierConfig);

        this.entities = [];
        this.insertEntity(this.character);
    }

    StarbasePhase.prototype = new Phase();
    
    return StarbasePhase;

});
