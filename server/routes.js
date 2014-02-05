define([
    'passport',
        
    'server/authentication/authorize',
    
    'server/routes/api/projectiles',
    'server/routes/api/enemies',
    'server/routes/api/characters',
    'server/routes/api/entities',
    'server/routes/api/accounts',
    'server/routes/api/images',
     
    'server/routes/home',
    'server/routes/setup',
    'server/routes/login',
    'server/routes/logout'
], function (
    passport,
         
    authorize,
     
    projectiles,
    enemies,
    characters,
    entities,
    accounts,
    images,
     
    home,
    setup,
    login,
    logout
) {
    'use strict';
        
    var routes = function (app) {

        // API's
        app.get('/api/projectiles', projectiles.all);
        app.get('/api/projectiles/:_id', projectiles.get);
        app.post('/api/projectiles', authorize, projectiles.post);
        app.put('/api/projectiles/:_id', authorize, projectiles.put);
        app.del('/api/projectiles/:_id', authorize, projectiles.delete);
            
        app.get('/api/characters', characters.all);
        app.get('/api/characters/:_id', characters.get);
        app.post('/api/characters', authorize, characters.post);
        app.put('/api/characters/:_id', authorize, characters.put);
        app.del('/api/characters/:_id', authorize, characters.delete);
    
        app.get('/api/enemies', enemies.get);
        app.get('/api/entities', entities.get);
        
        app.get('/api/accounts', accounts.logged);
        
        app.get('/api/images/:image', images.base64);
        
        // Pages
        app.get('/projectiles', authorize, home.index);
        app.get('/projectile/create', authorize, home.index);
        app.get('/projectile/edit/:id', authorize, home.index);
            
        app.get('/characters', authorize, home.index);
        app.get('/character/create', authorize, home.index);
        app.get('/character/edit/:id', authorize, home.index);
        
        app.get('/setup', authorize, setup.index);
        
        app.get('/game', authorize, home.index);
        
        app.get('/', authorize, home.index);
        
        app.get('/login', login.get);
        app.post('/login', login.post);
        
        app.get('/logout', logout.get);
        
        return app;
    }

    
    return { initialize: routes };

});