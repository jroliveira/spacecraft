define([
    'express',
    'module',
    'path',
    'consolidate',
    'mongoose',
    'passport',
    
    'server/authentication/authorize',

    'server/routes/api/projectiles',
    'server/routes/api/enemies',
    'server/routes/api/characters',
    'server/routes/api/entities',
     
    'server/routes/home',
    'server/routes/setup',
    'server/routes/login'
], function (
    express,
    module,
    path,
    consolidate,
    mongoose,
    passport,
     
    authorize,
    
    projectiles,
    enemies,
    characters,
    entities,
     
    home,
    setup,
    login
) {
    
    var dirname = path.dirname(module.uri);
    
    var app = express();

    app.configure(function () {
        app.use(express.bodyParser());
        app.engine('html', consolidate.underscore);
        app.set('views', path.join(dirname, '/../client/views'));
        app.set('view engine', 'underscore');
        app.use('/client', express.static(path.join(dirname, '/../client')));
        
        app.use(express.cookieParser());
        app.use(express.session({ secret: 'secretsession' }));
        app.use(passport.initialize());
        app.use(passport.session());
    });
        
    mongoose.connect('mongodb://sa:sa@alex.mongohq.com:10022/spacecraft');
    
    // API's
    app.get('/api/projectiles', projectiles.all);
    app.get('/api/projectiles/:_id', projectiles.get);
    app.post('/api/projectiles', projectiles.post);
    app.put('/api/projectiles/:_id', projectiles.put);
    app.del('/api/projectiles/:_id', projectiles.delete);
        
    app.get('/api/characters', characters.all);
    app.get('/api/characters/:_id', characters.get);
    app.post('/api/characters', characters.post);
    app.put('/api/characters/:_id', characters.put);
    app.del('/api/characters/:_id', characters.delete);

    app.get('/api/enemies', enemies.get);
    app.get('/api/entities', entities.get);
    
    // Pages
    app.get('/', home.index);
        
    app.get('/game', home.index);
        
    app.get('/projectiles', home.index);
    app.get('/projectile/create', home.index);
    app.get('/projectile/edit/:id', home.index);
        
    app.get('/characters', home.index);
    app.get('/character/create', home.index);
    app.get('/character/edit/:id', home.index);
        
    app.get('/setup', authorize, setup.index);
        
    app.get('/login', login.index);

    return app;

});