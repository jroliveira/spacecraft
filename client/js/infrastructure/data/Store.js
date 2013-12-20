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

        insertProjectiles: function () {
            var self = this;

            var urls = [
                '../../client/js/common/configs/projectiles/bullet.json',
                '../../client/js/common/configs/projectiles/missile.json',
                '../../client/js/common/configs/projectiles/laser.json'
            ];

            _.each(urls, function (url) {
                $.get(url, function () { })
                    .done(function (data) {
                        var json = JSON.stringify(eval("(" + data + ")"));
                        var obj = $.parseJSON(json);
                        self.session.projectiles.add(obj);
                    })
                    .fail(function (e) {
                        console.log(e);
                    });
            });
        },

        configure: function () {
            this.insertProjectiles();
        },

        initialize: function () {
            var self = this;

            this.session = null;

            db.open({
                server: 'spacecraft',
                version: 5,
                schema: {
                    projectiles: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },

                    projectiles: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },
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