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
            var urls = [
                '../../client/js/common/configs/projectiles/bullet.json',
                '../../client/js/common/configs/projectiles/missile.json',
                '../../client/js/common/configs/projectiles/laser.json'
            ];

            this.load(urls, function (obj) {
                session.projectiles.add(obj);
            });
        },

        enemies: function (session) {
            var urls = [
                '../../client/js/common/configs/enemies/asteroid.json'
            ];

            this.load(urls, function (obj) {
                session.enemies.add(obj);
            });
        },

        characters: function (session) {
            var urls = [
                '../../client/js/common/configs/characters/ship.json',
                '../../client/js/common/configs/characters/soldier.json'
            ];

            this.load(urls, function (obj) {
                session.characters.add(obj);
            });
        }

    };

});