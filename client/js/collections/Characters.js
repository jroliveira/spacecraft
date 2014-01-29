define([
    'jquery',
    'underscore',
    'backbone',
    
    'models/Character'
], function (
    $,
    _,
    Backbone,
    
    Character
) {

    var Characters = Backbone.Collection.extend({
        
        model: Character,
        
        url: '/api/characters',
        
        comparator: function(model){
            return model.get('type');
        }

    });

    return Characters;

});