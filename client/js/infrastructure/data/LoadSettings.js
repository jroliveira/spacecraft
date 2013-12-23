define([
    'jquery',
    'underscore'
], function ($, _) {

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
            this.load('/api/projectiles', function (obj) {
                session.projectiles.add(obj);
            });
        },

        enemies: function (session) {
            this.load('/api/enemies', function (obj) {
                session.enemies.add(obj);
            });
        },

        characters: function (session) {
            this.load('/api/characters', function (obj) {
                session.characters.add(obj);
            });
        }

    };

});