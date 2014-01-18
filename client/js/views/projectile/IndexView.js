define([
    'jquery',
    'underscore',
    'backbone',
    
    'views/projectile/ItemView',
    
    'text!templates/projectile/index.html',
    'text!templates/empty.html'
], function (
    $,
    _,
    Backbone,
    
    ItemView,
    
    template,
    templateEmpty
) {

    var IndexView = Backbone.View.extend({
        
        tagName: 'div',

        events: {
            'click #create': 'goCreate'
        },

        initialize: function () {
            this.collection.bind("change reset add remove", this.renderItems, this);
        },

        render: function() {
            $(this.el).html(template);
            this.renderItems();

            return this;
        },
        
        renderItems: function() {
            var $container = $(this.el).find('table > tbody');
            $container.empty();

            if (this.collection.models.length < 1) {
                $container.html(templateEmpty);
            } else {
                var me = this;

                $container.empty();
                this.collection.forEach(function (item) {
                    var view = new ItemView({ collection: me.collection, model: item });

                    var content = view.render();
                    $container.append(content.el);
                });
            }
        },

        goCreate: function(e) {
            e.preventDefault();
            Backbone.history.navigate('projectile/create', { trigger: true });
        },
        
        onClose: function() {
            this.collection.unbind("change reset add remove", this.renderItems);
        }

    });

    return IndexView;
    
});