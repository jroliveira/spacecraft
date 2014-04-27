define([
    'jquery',
    'underscore',
    'backbone',
    'socketio',
    
    'views/chat/MessageView',
    
    'text!templates/chat/chat.html',
    'jquery.format'
], function (
    $,
    _,
    Backbone,
    io,
     
    MessageView,
     
    template
) {

    var ChatView = Backbone.View.extend({

        el: $('.chat'),        

        events: {
            'click #send': 'send',
            'keypress #message': 'enter',
            'click #headerMessage': 'toggle'
        },
        
        render: function () {
            this.$el.html(template);
            
            var self = this;
            
            this.socket = io.connect();
 
            this.socket.on('connect', function () {

                $.getJSON('api/accounts', function (data) {
                    var user = data.email.substring(0, data.email.indexOf('@') + 1);
                    
                    var room = { current: '1', user:  user };
                    
                    self.socket.emit('room', room);
                });
 
                self.socket.on('message', function (message) {
                    var messageView = new MessageView({ model: message });
                    
                    var content = messageView.render();
                    $('#messages').append(content.el);
                    
                    $('.panel-body').animate({ scrollTop: $('#messages').height() }, 1000);
                });
                
                self.socket.on('disconnect', function () {
                    var message = { msg: $message.val(), date: new Date(), user: $('#email').val() };
                    
                    self.showMessage(message);
                });
            });
            
            return this;
        },
        
        enter: function (e) {
            if (e.keyCode === 13) this.send(e);
        },
        
        send: function (e) {
            e.preventDefault();
            
            if ($('#message').val() === '') return;
            
            this.socket.send($('#message').val());
            
            $('#message').val('');
        },
        
        toggle: function (e) {
            $('.chat > .panel > .message-content').toggle();
        }

    });

    return ChatView;

});