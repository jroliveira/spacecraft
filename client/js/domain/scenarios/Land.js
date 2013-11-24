define([
    'underscore',
    
    'common/configs/characters/SoldierConfig',

    'domain/Entity',
    'domain/scenarios/Scenario',
    'domain/characters/Soldier'
], function (_, SoldierConfig, Entity, Scenario, Soldier) {

    function Land($canvas, context) {
        this.$canvas = $canvas;
        this.context = context;
        
        this.character = new Soldier(SoldierConfig);

        this.entities = [];
        this.insertEntity(this.character);
        
        $(this).on('upKeyDown', this.upCharacter);
        $(this).on('downKeyDown', this.downCharacter);
        $(this).on('leftKeyDown', this.leftCharacter);
        $(this).on('rightKeyDown', this.rightCharacter);

        $(this).on('upKeyUp', this.upCharacter);
        $(this).on('downKeyUp', this.downCharacter);
        $(this).on('leftKeyUp', this.leftCharacter);
        $(this).on('rightKeyUp', this.rightCharacter);
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
