define([
    'jquery',
    'underscore',
    'backbone',
    
    'views/AlertView',
    
    'text!templates/projectile/item.html'
], function (
    $,
    _,
    Backbone,
     
    AlertView,

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
            
            this.model.destroy({
                success: function () {
                    var view = new AlertView({ type: 'success', message: 'Conta deletada com sucesso!' });
                    view.render();
                },
                error: function () {
                    var view = new AlertView({ type: 'error', message: 'Erro ao deletar a conta!' });
                    view.render();
                }
            });
        },
        
        goEdit: function (e) {
            e.preventDefault();
            Backbone.history.navigate('projectile/edit/' + this.model.get('_id'), { trigger: true });
        },
        
        onClose: function() {
            this.model.unbind('destroy', this.close);
        }
        
    });

    return ItemView;
    
});