var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs([
    'server/app'
], function (app) {
    
    app.listen(8000);
    
});