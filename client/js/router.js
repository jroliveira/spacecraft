define([
    'jquery',
    'backbone',
    
    'views/game/game',
    
    'views/HeaderView',
    'views/home/IndexView',
    'views/game/GameView',
    'views/projectile/IndexView',
    'views/projectile/SaveView',
    
    'models/Projectile',
    
    'collections/Projectiles'
], function (
    $,
    Backbone,
    
    game,
     
    HeaderView,
    HomeIndexView,
    GameView,
    ProjectileIndexView,
    ProjectileSaveView,
    
    Projectile,
    
    Projectiles
) {

    var AppRouter = Backbone.Router.extend({
        
        routes: {
            'projectile/edit/:id': 'editProjectile',
            'projectile/create': 'createProjectile',
            'projectiles': 'listProjectile',
            
            'game': 'game',

            '*actions': 'defaultAction'
        },
        
        showView: function (selector, view) {
            if (this.currentView) {
                this.currentView.close();
            }

            var container = view.render();
            $(selector).html(container.el);
            this.currentView = view;
            
            return view;
        },
        
    });

    var initialize = function () {
        
        this.headerView = new HeaderView;
        $('header').html(this.headerView.render().el);
        
        var appRouter = new AppRouter;
        
        appRouter.on('route:defaultAction', function () {
            var view = new HomeIndexView;
            this.showView('article', view);
        });
        
        appRouter.on('route:game', function () {
            var view = new GameView;
            this.showView('article', view);
            
            game.initialize();
        });
        
        appRouter.on('route:editProjectile', function (id) {
            var self = this,
                model = new Projectile({ _id: id });
            
            model.fetch({
                success: function () {
                    var view = new ProjectileSaveView({ model: model });
                    self.showView('article', view);
                }
            });
        });
        
        appRouter.on('route:createProjectile', function () {
            var model = new Projectile,
                view = new ProjectileSaveView({ model: model });
            
            this.showView('article', view);
        });
        
        appRouter.on('route:listProjectile', function () {
            var self = this,
                collection = new Projectiles;
            
            collection.fetch({
                success: function() {
                    var view = new ProjectileIndexView({ collection: collection });
                    self.showView('article', view);
                }
            });
        });

        Backbone.history.start({ pushState: true, root: '/' });
        
    };

    return { initialize: initialize };

});