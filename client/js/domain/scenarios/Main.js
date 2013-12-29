define([
    'jquery',
    'underscore',

    'infrastructure/components/Img',
    'infrastructure/components/HealthBar',
        
    'domain/scenarios/Scenario'
], function (
    $,
    _,
    
    Img,
    HealthBar,
    
    Scenario
) {

    function Main(context, phase, config) {
        this.config = config;

        this.context = context;

        this.phase = phase;
        $(this.phase).on('insertedEntity', $.proxy(this.insertComponent, this));
        $(this.phase).on('deletedEntity', $.proxy(this.removeComponent, this));

        this.components = [];
    }
    
    Main.prototype = new Scenario();

    Main.prototype.draw = function () {
        this.context.clearRect(0, 0, this.config.canvas.width, this.config.canvas.height);

        _.each(this.components, function (component) {
            component.draw();
        });
    };

    Main.prototype.updates = function () {
        this.phase.updates();
    };

    Main.prototype.start = function () {
        this.phase.configure();
        this.phase.start();
        this.draw();
    };

    // Config

    Main.prototype.insertComponent = function (event, entity) {
        var self = this;

        _.each(entity.config.components, function (name) {
            var type = eval(name);

            var component = new type(entity, self.context);

            self.components.push(component);
        });
    };

    Main.prototype.removeComponent = function (event, entity) {
        var self = this;

        _.each(this.components, function (component) {
            if (component.entity == entity) {
                var i = self.components.indexOf(component);

                delete self.components[i];
            }
        });
    };

    return Main;

});
