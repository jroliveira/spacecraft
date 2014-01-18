define([
    'jquery',
    'underscore',
    'backbone',
    
    'text!templates/game/index.html'
], function (
    $,
    _,
    Backbone,

    template
) {

    var GameView = Backbone.View.extend({

        tagName: 'div',

        render: function () {
            this.$el.html(template);

            return this;
        }

    });

    return GameView;
    
});