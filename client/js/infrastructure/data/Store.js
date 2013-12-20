define([
    'jquery',
    'underscore',
    'db'
], function (
    $,
    _,
    db
) {

    return {
        
        insert: function (urls, onsuccess) {
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

        insertProjectiles: function () {
            var self = this;

            var urls = [
                '../../client/js/common/configs/projectiles/bullet.json',
                '../../client/js/common/configs/projectiles/missile.json',
                '../../client/js/common/configs/projectiles/laser.json'
            ];

            this.insert(urls, function (obj) {
                self.session.projectiles.add(obj);
            });
        },
        
        insertEnemies: function () {
            var self = this;

            var urls = [
                '../../client/js/common/configs/enemies/asteroid.json'
            ];
            
            this.insert(urls, function (obj) {
                self.session.enemies.add(obj);
            });
        },

        configure: function () {
            this.insertProjectiles();
            this.insertEnemies();
        },

        initialize: function () {
            var self = this;

            this.session = null;

            db.open({
                server: 'spacecraft',
                version: 7,
                schema: {
                    projectiles: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },

                    enemies: {
                        key: { keyPath: 'type', autoIncrement: false }
                    }
                }
            }).done(function (s) {
                self.session = s;

                self.configure();
            });
        },

        getBy: function (table, value, onsuccess) {
            this.session.get(table, value)
                        .done(function (data) {
                            onsuccess(data);
                        });
        }
    };

});