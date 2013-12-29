define([
    'express',
    'module',
    'path',
    'consolidate',

    'server/routes/home',
    'server/routes/api/projectiles',
    'server/routes/api/enemies',
    'server/routes/api/characters',
    'server/routes/api/entities'
], function (
    express,
    module,
    path,
    consolidate,
    
    home,
    projectiles,
    enemies,
    characters,
    entities
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

    app.get('/api/projectiles', projectiles.get);
    
    app.get('/api/enemies', enemies.get);
    
    app.get('/api/characters', characters.get);
    
    app.get('/api/entities', entities.get);

    return app;

});