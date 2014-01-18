define([
    'jquery',
    'underscore',
    'backbone',
    
    'text!templates/header.html'
], function (
    $,
    _,
    Backbone,
    template
) {

    var HeaderView = Backbone.View.extend({

        className: 'navbar navbar-default',

        events: {
            'click #projectiles': 'goProjectiles',
            'click #home': 'goHome',
            'click #game': 'goGame'
        },

        render: function () {
            this.$el.html(template);
            
            return this;
        },
        
        goProjectiles: function (e) {
            e.preventDefault();
            Backbone.history.navigate('projectiles', { trigger: true });
        },
        
        goHome: function(e) {
            e.preventDefault();
            Backbone.history.navigate('/', { trigger: true });
        },
        
        goGame: function(e) {
            e.preventDefault();
            Backbone.history.navigate('/game', { trigger: true });
        }

    });

    return HeaderView;

});