var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs([
    'server/app',
    'socket.io',
    'http'
], function (app, socket, http) {    

    var server = http.createServer(app);
    var io = socket.listen(server);

    var port = process.env.PORT || 4000;
    server.listen(port, function () {
        console.log("Listening on " + port);
    });
    
    io.sockets.on('connection', function (socket) {
        
        socket.on('room', function(room) {
            if (socket.room) 
                socket.leave(socket.room);

            room.left = io.sockets.clients(room.current).length % 2 == 0;
            
            socket.room = room;
            socket.join(room.current);            
            
            var message = { msg: 'conectado...', date: new Date(), user: room.user, left: room.left };
            socket.in(room.current).emit('message', message);
            socket.in(room.current).broadcast.emit('message', message);
        });
        
        socket.on('message', function (msg) {            
            var message = { msg: msg, date: new Date(), user: socket.room.user, left: socket.room.left };
            
            socket.in(socket.room.current).emit('message', message);
            socket.in(socket.room.current).broadcast.emit('message', message);
        });
        
    });
});