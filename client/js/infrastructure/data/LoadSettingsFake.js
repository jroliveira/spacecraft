define([
    'jquery',
    'underscore'
], function ($, _) {

    return {
        
        load: function (urls, onsuccess) {
            _.each(urls, function (url) {
                $.get(url, function () { })
                    .done(function (data) {
                        var json = JSON.stringify(eval("(" + data + ")"));
                        var obj = $.parseJSON(json);

                        onsuccess(obj);
                    })
                    .fail(function (e) {
                        console.log(e);
                    });
            });
        },

        projectiles: function (session) {
            var defer = $.Deferred();
            
            var urls = [
                '../../client/js/common/configs/projectiles/bullet.json',
                '../../client/js/common/configs/projectiles/missile.json',
                '../../client/js/common/configs/projectiles/laser.json'
            ];

            this.load(urls, function (obj) {
                session.projectiles.add(obj);
                
                defer.resolve();
            });
            
            return defer.promise();
        },

        enemies: function (session) {
            var defer = $.Deferred();
            
            var urls = [
                '../../client/js/common/configs/enemies/asteroid.json'
            ];

            this.load(urls, function (obj) {
                session.enemies.add(obj);
                
                defer.resolve();
            });
            
            return defer.promise();
        },

        characters: function (session) {
            var defer = $.Deferred();
            
            var urls = [
                '../../client/js/common/configs/characters/ship.json',
                '../../client/js/common/configs/characters/soldier.json'
            ];

            this.load(urls, function (obj) {
                session.characters.add(obj);
                
                defer.resolve();
            });
            
            return defer.promise();
        },
        
        entities: function (session) {
            var defer = $.Deferred();
            
            var urls = [
                '../../client/js/common/configs/starbase.json'
            ];

            this.load(urls, function (obj) {
                session.entities.add(obj);
                
                defer.resolve();
            });
            
            return defer.promise();
        },

    };

});