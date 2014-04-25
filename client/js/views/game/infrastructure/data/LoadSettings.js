define([
    'jquery',
    'underscore',
    
    'views/game/infrastructure/ImageLoader'
], function (
    $, 
    _,
     
    imageLoader
) {

    return {

        load: function (url, onsuccess) {
            $.get(url, function () { })
                .done(function (data) {
                    _.each(data, function (item) {
                        onsuccess(item);
                    });
                })
                .fail(function (e) {
                    console.log(e);
                });
        },

        projectiles: function (session) {
            var defer = $.Deferred();
            
            this.load('/api/projectiles', function (obj) {
                session.projectiles.clear().done(function() {
                    session.projectiles.add(obj);

                    defer.resolve();
                });
            });
            
            return defer.promise();
        },

        enemies: function (session) {
            var defer = $.Deferred();
            
            this.load('/api/enemies', function (obj) {
                session.enemies.clear().done(function() {
                    session.enemies.add(obj);
                
                    defer.resolve();
                });     
            });
            
            return defer.promise();
        },

        characters: function (session) {
            var defer = $.Deferred();
            
            this.load('/api/characters', function (obj) {
                session.characters.clear().done(function() {
                    session.characters.add(obj);
                
                    defer.resolve();
                });
            });
            
            return defer.promise();
        },
        
        entities: function (session) {
            var defer = $.Deferred();
            
            this.load('/api/entities', function (obj) {
                session.entities.clear().done(function() {
                    session.entities.add(obj);
                
                    defer.resolve();
                });
            });
            
            return defer.promise();
        },
        
        backgrounds: function (session) {
            var defer = $.Deferred();
            
            this.load('/api/backgrounds', function (obj) {
                session.backgrounds.clear().done(function() {
                    session.backgrounds.add(obj);
                
                    defer.resolve();
                });
            });
            
            return defer.promise();
        },
        
        effects: function (session) {
            var defer = $.Deferred();
            
            this.load('/api/effects', function (obj) {
                session.effects.clear().done(function() {
                    session.effects.add(obj);
                
                    defer.resolve();
                });
            });
            
            return defer.promise();
        },
        
        phases: function (session) {
            var defer = $.Deferred();
            
            this.load('/api/phases', function (obj) {
                session.phases.clear().done(function() {
                    session.phases.add(obj);
                
                    defer.resolve();
                });
            });
            
            return defer.promise();
        },
        
        scenarios: function (session) {
            var defer = $.Deferred();
            
            this.load('/api/scenarios', function (obj) {
                session.scenarios.clear().done(function() {
                    session.scenarios.add(obj);
                
                    defer.resolve();
                });
            });
            
            return defer.promise();
        },
        
        images: function() {
            var defer = $.Deferred();
            
            $.when(
                
                imageLoader.load('backgrounds_background1.png', function(base64) { }),
                imageLoader.load('parallax_parallax1.png', function(base64) { }),
                imageLoader.load('parallax_parallax2.png', function(base64) { }),
                imageLoader.load('characters_shipSprite.png', function(base64) { }),
                imageLoader.load('characters_soldierSprite.png', function(base64) { }),
                imageLoader.load('enemies_asteroid.png', function(base64) { }),
                imageLoader.load('projectiles_bullet.png', function(base64) { }),
                imageLoader.load('projectiles_laser.png', function(base64) { }),
                imageLoader.load('projectiles_missile.png', function(base64) { })
            
            ).then(function () {
                
                defer.resolve();
                
            });
            
            return defer.promise();
        }

    };

});