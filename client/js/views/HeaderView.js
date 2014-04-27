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

        el: $('.navbar-collapse.collapse'),

        events: {
            'click #projectiles': 'goProjectiles',
            'click #characters': 'goCharacters',
            'click #home': 'goHome',
            'click #game': 'goGame'
        },

        render: function () {
            var self = this;
            $.getJSON('api/accounts', function (data) {
                var data = { user: data },
                compilatedTemplate = _.template(template, data);
                $('#email').val(data.user.email);
                
                self.$el.html(compilatedTemplate);
            });
            
            return this;
        },
        
        goProjectiles: function (e) {
            e.preventDefault();
            Backbone.history.navigate('projectiles', { trigger: true });
        },
        
        goCharacters: function (e) {
            e.preventDefault();
            Backbone.history.navigate('characters', { trigger: true });
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