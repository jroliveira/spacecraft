define([
    'express',
    'module',
    'path',
    'consolidate'
], function (
    express,
    module,
    path,
    consolidate
) {
    var app = express();

    app.configure(function () {
        var filename = module.uri;
        
        app.engine('html', consolidate.underscore);
        app.set('view engine', 'underscore');
        
        app.use('/client', express.static(path.dirname(filename) + '/../client'));
        app.set('views', path.dirname(filename) + '/views');
    });
    
    app.get('/', function (req, res) {
        res.render('index.html');
    });

    return app;
});