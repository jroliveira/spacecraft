define([
    'jquery',
    'underscore',

    'infrastructure/inputs/Keyboard'
], function ($, _, Keyboard) {

    function Scenario(context, phase, config) {
        this.config = config;
        
        this.context = context;
        
        this.phase = phase;
        $(this.phase).on('insertedEntity', $.proxy(this.insertComponent, this));
        $(this.phase).on('deletedEntity', $.proxy(this.deletedComponent, this));
        
        this.components = [];

        this.input = new Keyboard();
    }

    Scenario.prototype.draw = function () {
        this.context.clearRect(0, 0, this.config.canvas.width, this.config.canvas.height);

        _.each(this.components, function (component) {
            component.draw();
        });
    };

    Scenario.prototype.start = function () {
        this.input.configure();
        this.phase.start();
        this.draw();
    };

    // Config

    Scenario.prototype.insertComponent = function (event, entity) {
        var self = this;
        
        _.each(entity.config.components, function (type) {
            var component = new type(entity, self.context);

            self.components.push(component);
        });
    };

    Scenario.prototype.removeComponent = function (event, entity) {
        var self = this;
        
        _.each(this.components, function (component) {
            if (component.entity == entity) {
                var i = self.components.indexOf(component);

                delete self.components[i];
            }
        });
    };

    return Scenario;

});
