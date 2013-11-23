define([
    'underscore',
    
    'common/configs/characters/SoldierConfig',

    'domain/Entity',
    'domain/scenarios/Scenario',
    'domain/characters/Soldier'
], function (_, SoldierConfig, Entity, Scenario, Soldier) {

    function Land($canvas, context) {
        this.$canvas = $canvas;
        this.context = context;
        
        this.ended = false;

        this.soldier = new Soldier(SoldierConfig);

        this.entities = [];
        this.insertEntity(this.soldier);
    }

    Land.prototype = new Scenario();

    Land.prototype.updates = function () {
        var self = this;

        _.each(this.entities, function (entity) {
            if (entity instanceof Entity) {
                self.detectsCollision(entity);
            }

            entity.updates();
        });

        this.draw();
    };

    Land.prototype.start = function () {
        var self = this;

        this.draw();

        $(document).bind('keydown', function (e) {
            e.preventDefault();

            switch (e.keyCode) {
                case 37:
                    self.soldier.left(true);
                    break;
                case 38:
                    self.soldier.up(true);
                    break;
                case 39:
                    self.soldier.right(true);
                    break;
                case 40:
                    self.soldier.down(true);
                    break;
            }
        });

        $(document).bind('keyup', function (e) {
            e.preventDefault();

            switch (e.keyCode) {
                case 37:
                    self.soldier.left(false);
                    break;
                case 38:
                    self.soldier.up(false);
                    break;
                case 39:
                    self.soldier.right(false);
                    break;
                case 40:
                    self.soldier.down(false);
                    break;
            }
        });
    };
    
    return Land;

});
