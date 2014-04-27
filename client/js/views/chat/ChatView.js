define([
    'jquery',
    'underscore',
    'backbone',
    'socketio',
    
    'text!templates/chat/chat.html',
    'jquery.format'
], function (
    $,
    _,
    Backbone,
    io,
     
    template
) {

    var ChatView = Backbone.View.extend({

        el: $('.chat'),
        
        left: false,            

        events: {
            'click #send': 'send',
            'keypress #message': 'enter',
            'click #headerMessage': 'toggle'
        },
        
        render: function () {
            this.$el.html(template);
            
            var self = this;
            
            this.iosocket = io.connect();
 
            this.iosocket.on('connect', function () {
 
                self.iosocket.on('message', function(message) {
                    self.showMessage(message);
                });
                
                self.iosocket.on('disconnect', function() {
                    self.showMessage({
                        msg: 'desconectado',
                        date: new Date(),
                        user: 'junior'
                    });
                });
            });
            
            return this;
        },
        
        leftLayout: function() {
            return '<li class="left clearfix">' +
                '<span class="chat-img pull-left">' +
                    '<img src="http://placehold.it/36/55C1E7/fff&amp;text=U" alt="User Avatar" class="img-circle">' +
                '</span>' +
                '<div class="chat-body clearfix">' +
                    '<div class="header">' +
                        '<strong class="primary-font">%user%</strong>' +
                        '<small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>%date%</small>' +
                    '</div>' +
                    '<p>%message%</p>' +
                '</div>' +
            '</li>';
        },
            
        rightlayout: function () {
            return '<li class="right clearfix">' +
                '<span class="chat-img pull-right">' +
                    '<img src="http://placehold.it/36/FA6F57/fff&amp;text=ME" alt="User Avatar" class="img-circle">' +
                '</span>' +
                '<div class="chat-body clearfix">' +
                    '<div class="header">' +
                        '<small class=" text-muted"><span class="glyphicon glyphicon-time"></span>%date%</small>' +
                        '<strong class="pull-right primary-font">%user%</strong>' +
                    '</div>' +
                    '<p class="text-right">%message%</p>' +
                '</div>' +
            '</li>';
        },
        
        showMessage: function (message) {
            this.left = !this.left;
            
            var layout;
            
            if (this.left) {
                layout = this.leftLayout();
            } else {
                layout = this.rightlayout();
            }
            
            $('#messages').append(
                layout.replace('%message%', message.msg)
                      .replace('%user%', message.user)
                      .replace('%date%', $.format.date(new Date(message.date), "dd/MM hh:mm"))
            );
        },
        
        enter: function (e) {
            if (e.keyCode === 13) this.send(e);
        },
        
        send: function (e) {
            e.preventDefault();
            
            var $message = $('#message');
            
            if ($message.val() === '') return;
            
            var message = $message.val();
            this.iosocket.send(message);
            this.showMessage({
                msg: message,
                date: new Date(),
                user: 'junior'
            });
            
            $message.val('');
        },
        
        toggle: function (e) {
            $('.chat > .panel > .panel-body').toggle();
            $('.chat > .panel > .panel-footer').toggle();
        }

    });

    return ChatView;

});