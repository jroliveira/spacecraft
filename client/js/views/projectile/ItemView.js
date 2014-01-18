define([
    'jquery',
    'underscore',
    'backbone',
    
    'text!templates/projectile/item.html'
], function (
    $,
    _,
    Backbone,

    template
) {

    var ItemView = Backbone.View.extend({

        tagName: "tr",
        
        initialize: function() {
            this.model.bind('destroy', this.close, this);
        },

        events: {
            'click #destroy': 'destroy',
            'click #goEdit': 'goEdit'
        },

        render: function () {
            var data = this.model.toJSON(),
                compilatedTemplate = _.template(template, data);
            
            $(this.el).append(compilatedTemplate);

            return this;
        },
        
        destroy: function (e) {
            e.preventDefault();
        },
        
        goEdit: function (e) {
            e.preventDefault();
            Backbone.history.navigate('conta/editar/' + this.model.get('id'), { trigger: true });
        },
        
        onClose: function() {
            this.model.unbind('destroy', this.close);
        }
        
    });

    return ItemView;
    
});