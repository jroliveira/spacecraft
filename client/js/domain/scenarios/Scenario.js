define([
    'underscore',

    'domain/Entity'
], function (_, Entity) {

    function Scenario() { }

    Scenario.prototype.draw = function () {
        var self = this;

        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

        _.each(this.entities, function (entity) {
            entity.draw(self.context);
        });
    };

    Scenario.prototype.updates = function () { };

    Scenario.prototype.start = function () { };

    // Collision

    Scenario.prototype.detectsCollision = function (entity) {
        var self = this;

        if (entity.destroyed()) {
            this.removeEntity(entity);
            return;
        }

        _.each(this.entities, function (obstacle) {
            if ((obstacle instanceof Entity) && (obstacle != entity)) {
                if (entity.collided(obstacle)) {
                    entity.damages(obstacle.config.damage);
                    if (entity.destroyed()) {
                        self.removeEntity(entity);
                    }

                    obstacle.damages(entity.config.damage);
                    if (obstacle.destroyed()) {
                        self.removeEntity(obstacle);
                    }
                }
            }
        });
    };

    // Config

    Scenario.prototype.insertEntity = function (entity) {
        this.entities.push(entity);
    };

    Scenario.prototype.removeEntity = function (entity) {
        var i = this.entities.indexOf(entity);

        delete this.entities[i];
    };

    return Scenario;

});
