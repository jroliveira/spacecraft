define([
    'jquery',
    
    'infrastructure/inputs/Keyboard',
    
    'common/configs/characters/SoldierConfig',

    'domain/scenarios/Scenario',
    'domain/characters/Soldier'
], function ($, Keyboard, SoldierConfig, Scenario, Soldier) {

    function Land(context, config) {
        this.config = config;
        
        this.context = context;
        
        this.character = new Soldier(SoldierConfig);

        this.entities = [];
        this.insertEntity(this.character);
        
        this.input = new Keyboard();
    }

    Land.prototype = new Scenario();
    
    return Land;

});
