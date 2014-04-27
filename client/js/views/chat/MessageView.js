define([
    'jquery',
    'underscore',
    'backbone',
    
    'text!templates/chat/message.html',
    'jquery.format'
], function (
    $,
    _,
    Backbone,
     
    template
) {

    var MessageView = Backbone.View.extend({

        tagName: 'li',
        
        render: function () {
            var data = {
                left: this.model.left,
                user: this.model.user,
                letterImage: this.model.user.substring(0, 2),
                date: $.format.date(new Date(this.model.date), "dd/MM hh:mm"),
                message: this.model.msg
            };         
           
            var compilatedTemplate = _.template(template, data);
            $(this.el).append(compilatedTemplate);

            return this;
        }

    });

    return MessageView;

});