define([
    'jquery',
    'underscore',
    
    'infrastructure/inputs/Keyboard',
    
    'common/configs/characters/SoldierConfig',

    'domain/scenarios/Scenario',
    'domain/characters/Soldier'
], function ($, _, Keyboard, SoldierConfig, Scenario, Soldier) {

    function Land($canvas, context) {
        this.$canvas = $canvas;
        this.context = context;
        
        this.character = new Soldier(SoldierConfig);

        this.entities = [];
        this.insertEntity(this.character);
        
        this.input = new Keyboard();
    }

    Land.prototype = new Scenario();
    
    return Land;

});
