define([
    'jquery',
    'backbone',
    
    'views/game/game',
    
    'views/HeaderView',
    'views/home/IndexView',
    'views/game/GameView',
    'views/projectile/IndexView',
    'views/projectile/SaveView',
    'views/character/IndexView',
    'views/character/SaveView',
    
    'models/Projectile',
    'models/Character',
    
    'collections/Projectiles',
    'collections/Characters'
], function (
    $,
    Backbone,
    
    game,
     
    HeaderView,
    HomeIndexView,
    GameView,
    ProjectileIndexView,
    ProjectileSaveView,
    CharacterIndexView,
    CharacterSaveView,
    
    Projectile,
    Character,
    
    Projectiles,
    Characters
) {

    var AppRouter = Backbone.Router.extend({
        
        routes: {
            'projectile/edit/:id': 'editProjectile',
            'projectile/create': 'createProjectile',
            'projectiles': 'listProjectile',
            
            'character/edit/:id': 'editCharacter',
            'character/create': 'createCharacter',
            'characters': 'listCharacter',
            
            'game': 'game',

            '*actions': 'defaultAction'
        },
        
        showView: function (selector, view, menu) {  
            $('.nav > li.active').removeClass('active');
            $('#' + menu).parent().addClass('active');
            
            if (this.currentView) this.currentView.close();

            var container = view.render();
            $(selector).html(container.el);
            
            this.currentView = view;
        },
        
    });

    var initialize = function () {
        
        this.headerView = new HeaderView;
        $('header').html(this.headerView.render().el);
        
        var appRouter = new AppRouter;
        
        appRouter.on('route:defaultAction', function () {
            var view = new HomeIndexView;
            this.showView('article', view, '');
        });
        
        appRouter.on('route:game', function () {
            var view = new GameView;
            this.showView('article', view, 'game');
            
            game.initialize();
        });
        
        appRouter.on('route:editProjectile', function (id) {
            var self = this,
                model = new Projectile({ _id: id });
            
            model.fetch({
                success: function () {
                    var view = new ProjectileSaveView({ model: model });
                    self.showView('article', view, 'projectiles');
                }
            });
        });
        
        appRouter.on('route:createProjectile', function () {
            var model = new Projectile,
                view = new ProjectileSaveView({ model: model });
            
            this.showView('article', view, 'projectiles');
        });
        
        appRouter.on('route:listProjectile', function () {
            var self = this,
                collection = new Projectiles;
            
            collection.fetch({
                success: function() {
                    var view = new ProjectileIndexView({ collection: collection });
                    self.showView('article', view, 'projectiles');
                }
            });
        });
        
        appRouter.on('route:editCharacter', function (id) {
            var self = this,
                model = new Character({ _id: id });
            
            model.fetch({
                success: function () {
                    var view = new CharacterSaveView({ model: model });
                    self.showView('article', view, 'projectiles');
                }
            });
        });
        
        appRouter.on('route:createCharacter', function () {
            var model = new Character,
                view = new CharacterSaveView({ model: model });
            
            this.showView('article', view, 'characters');
        });
        
        appRouter.on('route:listCharacter', function () {
            var self = this,
                collection = new Characters;
            
            collection.fetch({
                success: function() {
                    var view = new CharacterIndexView({ collection: collection });
                    self.showView('article', view, 'characters');
                }
            });
        });

        Backbone.history.start({ pushState: true, root: '/' });
        
    };

    return { initialize: initialize };

});