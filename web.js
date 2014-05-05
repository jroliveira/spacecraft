var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs([
    'server/app'
], function (app) {    
    var port = process.env.PORT || 4000;
    app.listen(port, function () {
        console.log("Listening on " + port);
    });
});