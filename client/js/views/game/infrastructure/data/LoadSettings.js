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
        
        images: function() {
            var defer = $.Deferred();
            
            $.when(
                
                imageLoader.load('backgrounds_background1.png', function(base64) { }),
                imageLoader.load('parallax_parallax1.png', function(base64) { }),
                imageLoader.load('parallax_parallax2.png', function(base64) { })
            
            ).then(function () {
                
                defer.resolve();
                
            });
            
            return defer.promise();
        }

    };

});