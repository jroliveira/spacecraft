define([
    'express',
    'module',
    'path',
    'consolidate',

    'server/routes/home'
], function (
    express,
    module,
    path,
    consolidate,
    
    home
) {
    
    var dirname = path.dirname(module.uri);
    
    var app = express();

    app.configure(function () {
        app.engine('html', consolidate.underscore);
        app.set('views', dirname + '/../client/views');
        app.set('view engine', 'underscore');
        app.use('/client', express.static(dirname + '/../client'));
    });
    
    app.get('/', home.index);

    return app;

});