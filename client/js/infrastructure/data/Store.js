define([
    'jquery',
    'underscore',
    'db',
        
    'infrastructure/data/LoadSettingsFake'
], function (
    $,
    _,
    db,
    
    loadSettings
) {

    return {

        configure: function () {
            loadSettings.projectiles(this.session);
            loadSettings.enemies(this.session);
            loadSettings.characters(this.session);
        },

        initialize: function () {
            var self = this;

            this.session = null;

            db.open({
                server: 'spacecraft',
                version: 8,
                schema: {
                    projectiles: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },

                    enemies: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },
                    
                    characters: {
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