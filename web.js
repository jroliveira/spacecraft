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
        socket.on('message', function (msg) {
            console.log('Message Received: ', msg);
            socket.broadcast.emit('message', msg);
        });
    });
});