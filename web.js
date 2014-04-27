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
            if (socket.room) socket.leave(socket.room);
            
            socket.room = room;
            socket.join(room.current);            
            
            socket.in(room.current).emit('message', { msg: 'conectado...', date: new Date(), user: room.user, left: false });
            socket.in(room.current).broadcast.emit('message', { msg: 'conectado...', date: new Date(), user: room.user, left: true });
        });
        
        socket.on('message', function (msg) {
            socket.in(socket.room.current).emit('message', { msg: msg, date: new Date(), user: socket.room.user, left: false });
            socket.in(socket.room.current).broadcast.emit('message', { msg: msg, date: new Date(), user: socket.room.user, left: true });
        });
        
    });
});