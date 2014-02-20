define([
    'jquery',
    'underscore',
    'db',

    'views/game/infrastructure/data/LoadSettings'
], function (
    $,
    _,
    db,

    loadSettings
) {

    return {

        configure: function () {
            var defer = $.Deferred();

            $.when(
                
                loadSettings.projectiles(this.session),
                loadSettings.enemies(this.session),
                loadSettings.characters(this.session),
                loadSettings.entities(this.session),
                loadSettings.backgrounds(this.session),
                loadSettings.effects(this.session),
                loadSettings.images()                
            
            ).then(function () {
                
                defer.resolve();
                
            });

            return defer.promise();
        },

        initialize: function () {
            var defer = $.Deferred();
            
            var self = this;

            this.session = null;

            db.open({
                server: 'spacecraft',
                version: 17,
                schema: {
                    projectiles: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },

                    enemies: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },

                    characters: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },

                    entities: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },
                    
                    backgrounds: {
                        key: { keyPath: 'name', autoIncrement: false }
                    },
                    
                    effects: {
                        key: { keyPath: 'name', autoIncrement: false }
                    }
                }
            }).done(function (s) {
                self.session = s;

                $.when(
                
                    self.configure()
                
                ).then(function () {
                    
                    defer.resolve();
                    
                });                
                
            });
            
            return defer.promise();
        },

        getBy: function (table, value, onsuccess) {
            this.session.get(table, value)
                        .done(function (data) {
                            onsuccess(data);
                        });
        }
    };

});