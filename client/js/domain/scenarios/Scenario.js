define([
    'jquery',
    'underscore',

    'domain/Entity'
], function ($, _, Entity) {

    function Scenario() { }

    Scenario.prototype.draw = function () {
        var self = this;

        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

        _.each(this.entities, function (entity) {
            entity.draw(self.context);
        });
    };

    Scenario.prototype.updates = function() {
        var self = this;

        _.each(this.entities, function (entity) {
            if (entity instanceof Entity) {
                self.detectsCollision(entity);
            }

            entity.updates();
        });

        this.draw();

        $(this).trigger('update');
    };

    Scenario.prototype.start = function() {
        this.input.configure();
        this.draw();
    };

    // Collision

    Scenario.prototype.detectsCollision = function (entity) {
        _.each(this.entities, function (obstacle) {
            if ((obstacle instanceof Entity) && (obstacle != entity)) {
                if (entity.collided(obstacle)) {
                    entity.damages(obstacle);
                    obstacle.damages(entity);
                }
            }
        });
    };
    
    // Config

    Scenario.prototype.shoot = function (munition) {
        $(munition).on('destroy', this.removeEntity);

        this.insertEntity(munition);
    };

    Scenario.prototype.threaten = function(enemy) {
        $(enemy).on('destroy', this.removeEntity);

        this.insertEntity(enemy);
    };

    Scenario.prototype.insertEntity = function (entity) {
        this.entities.push(entity);
    };

    Scenario.prototype.removeEntity = function (event, entity) {
        var i = entity.owner.entities.indexOf(entity);

        delete entity.owner.entities[i];
    };

    return Scenario;

});
