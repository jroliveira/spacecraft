define([
    'express',
    
    'server/configs/config',
    'server/routes'
], function (
    express,
     
    config,
    routes
) {
    
    var app = express();
        
    config.passport();
    config.app(app);
    config.mongoose();    
    
    routes.initialize(app);

    return app;

});