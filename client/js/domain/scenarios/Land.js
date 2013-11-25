define([
    'jquery',
    'underscore',
    
    'infrastructure/inputs/Keyboard',
    
    'common/configs/characters/SoldierConfig',

    'domain/Entity',
    'domain/scenarios/Scenario',
    'domain/characters/Soldier'
], function ($, _, Keyboard, SoldierConfig, Entity, Scenario, Soldier) {

    function Land($canvas, context) {
        this.$canvas = $canvas;
        this.context = context;
        
        this.character = new Soldier(SoldierConfig);

        this.entities = [];
        this.insertEntity(this.character);
        
        this.input = new Keyboard(this);

        $(this.input).on('up', this.upCharacter);
        $(this.input).on('down', this.downCharacter);
        $(this.input).on('left', this.leftCharacter);
        $(this.input).on('right', this.rightCharacter);
    }

    Land.prototype = new Scenario();
    
    // Direction

    Land.prototype.upCharacter = function (event, pressed) {
        var self = event.target;

        self.character.up(pressed);
    };

    Land.prototype.downCharacter = function (event, pressed) {
        var self = event.target;

        self.character.down(pressed);
    };

    Land.prototype.leftCharacter = function (event, pressed) {
        var self = event.target;

        self.character.left(pressed);
    };

    Land.prototype.rightCharacter = function (event, pressed) {
        var self = event.target;

        self.character.right(pressed);
    };
    
    return Land;

});
