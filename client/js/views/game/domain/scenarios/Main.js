define([
    'jquery',
    'underscore',
    'wait',

    'views/game/infrastructure/components/Img',
    'views/game/infrastructure/components/HealthBar',
    'views/game/infrastructure/components/Sprite',
    
    'views/game/common/configs/scenarios/MainConfig',
    'views/game/common/configs/phases/StarbasePhaseConfig',
        
    'views/game/domain/scenarios/Scenario',
    'views/game/domain/scenarios/Main',
    'views/game/domain/phases/StarbasePhase'
], function (
    $,
    _,
    wait,
    
    Img,
    HealthBar,
    Sprite,
    
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
        var phase,
            self = this;

        $.when(

            $.wait(1000),
            phase = new StarbasePhase(StarbasePhaseConfig)


        ).then(function () {

            var scenario = new Main(self.context, MainConfig, phase);
            $(document).trigger('changeScenario', [scenario]);

        });
    };

    // Config

    Main.prototype.insertComponent = function (event, entity) {
        var self = this;

        _.each(entity.config.components, function (config) {
            var type = eval(config.type);

            var component = new type(config, entity, self.context);

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
