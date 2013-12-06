define([
    'jquery',
    'underscore',

    'domain/Entity'
], function ($, _, Entity) {

    function Scenario() { }

    Scenario.prototype.draw = function () {
        var self = this;

        this.context.clearRect(0, 0, this.config.canvas.width, this.config.canvas.height);

        _.each(this.components, function (component) {
            component.draw(self.context);
        });
    };

    Scenario.prototype.updates = function () {
        var self = this;

        _.each(this.entities, function (entity) {
            if (entity instanceof Entity) {
                self.detectsCollision(entity);
            }

            entity.updates();
        });

        this.draw();

        $(this).trigger('updated');
    };

    Scenario.prototype.start = function () {
        this.input.configure();
        this.draw();
    };

    // Collision

    Scenario.prototype.detectsCollision = function (entity) {
        _.each(this.entities, function (obstacle) {
            if ((obstacle instanceof Entity) && (obstacle != entity)) {
                if (entity.collided(obstacle)) {
                    $(entity).trigger('collided', [obstacle]);
                    $(obstacle).trigger('collided', [entity]);
                }
            }
        });
    };

    // Config

    Scenario.prototype.shoot = function (event, munition) {
        $(munition).on('destroy', $.proxy(this.removeEntity, this));

        this.insertEntity(munition);
    };

    Scenario.prototype.threaten = function (enemy) {
        $(enemy).on('destroy', $.proxy(this.removeEntity, this));

        this.insertEntity(enemy);
    };

    Scenario.prototype.insertEntity = function (entity) {
        this.entities.push(entity);
    };

    Scenario.prototype.removeEntity = function (event, entity) {
        var i = this.entities.indexOf(entity);

        delete this.entities[i];
    };
    
    return Scenario;

});
