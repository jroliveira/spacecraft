define([
    'db'
], function (database) {

    return {

        configure: function () {
            
            // Projectiles
            this.db.projectiles.add({ health: 1, damage: 3, speed: 3, type: 'bullet' });
            this.db.projectiles.add({ health: 1, damage: 5, speed: 5, type: 'missile' });
            this.db.projectiles.add({ health: 1, damage: 10, speed: 7, type: 'laser' });
            
        },

        initialize: function () {
            var self = this;

            this.db = null;

            database.open({
                server: 'spacecraft',
                version: 1,
                schema: {
                    projectiles: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },
                    
                }
            }).done(function (s) {
                self.db = s;

                self.configure();
            });
        }
    };

});