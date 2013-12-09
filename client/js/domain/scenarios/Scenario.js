define([
    'jquery',
    'underscore',

    'infrastructure/inputs/Keyboard'
], function ($, _, Keyboard) {

    function Scenario(context, phase, config) {
        this.config = config;
        
        this.phase = phase;
        this.context = context;
        
        this.input = new Keyboard();
    }

    Scenario.prototype.draw = function () {
        var self = this;

        this.context.clearRect(0, 0, this.config.canvas.width, this.config.canvas.height);

        _.each(this.components, function (component) {
            component.draw(self.context);
        });
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

    return Scenario;

});
