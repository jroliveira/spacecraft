define([
    'jquery',
    'underscore',

    'infrastructure/components/Img',
    'infrastructure/components/HealthBar',
    
    'common/configs/scenarios/MainConfig',
    'common/configs/phases/StarbasePhaseConfig',
        
    'domain/scenarios/Scenario',
    'domain/scenarios/Main',
    'domain/phases/StarbasePhase'
], function (
    $,
    _,
    
    Img,
    HealthBar,
    
    MainConfig,
    StarbasePhaseConfig,
    
    Scenario,
    Main,
    StarbasePhase
) {

    function Main(context, config, phase) {
        this.context = context;
        this.config = config;
        this.phase = phase;
        this.components = [];
        
        $(this.phase).on('insertedEntity', $.proxy(this.insertComponent, this));
        $(this.phase).on('deletedEntity', $.proxy(this.removeComponent, this));
        $(document).on('phaseEnded', $.proxy(this.changeScenario, this));
    }
    
    Main.prototype = new Scenario();

    Main.prototype.updates = function () {
        this.phase.updates();
    };

    Main.prototype.start = function () {
        this.phase.configure();
        this.phase.start();
    };
    
    Main.prototype.changeScenario = function (event) {
        var phase = new StarbasePhase(StarbasePhaseConfig),
            scenario = new Main(this.context, MainConfig, phase);
        
        $(document).trigger('changeScenario', [scenario]);
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
