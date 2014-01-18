define([
    'jquery',
    'underscore',
    'backbone',
    
    'models/Projectile'
], function (
    $,
    _,
    Backbone,
    
    Projectile
) {

    var Projectiles = Backbone.Collection.extend({
        
        model: Projectile,
        
        url: '/api/projectiles',
        
        comparator: function(model){
            return model.get('type');
        }

    });

    return Projectiles;

});