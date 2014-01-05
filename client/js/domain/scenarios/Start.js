define([
    'jquery',
    'underscore',

    'infrastructure/components/Text',
    
    'common/configs/scenarios/MainConfig',
    'common/configs/phases/FirstPhaseConfig',

    'domain/scenarios/Scenario',
    'domain/scenarios/Main',
    'domain/phases/FirstPhase'
], function (
    $,
    _,

    Text,
    
    MainConfig,
    FirstPhaseConfig,

    Scenario,
    Main,
    FirstPhase
) {

    function Start(context, config) {
        this.context = context;
        this.config = config;
        this.components = [];
        
        $(document).on('enter', $.proxy(this.changeScenario, this));
    }

    Start.prototype = new Scenario();

    Start.prototype.start = function () {
        var config = { message: 'precione ENTER para começar o jogo.', pos: { x: 50, y: 50 } },
            component = new Text(config, this.context);
        
        this.components.push(component);
    };

    Start.prototype.changeScenario = function (event, pressed) {
        var phase = new FirstPhase(FirstPhaseConfig),
            scenario = new Main(this.context, MainConfig, phase);

        $(document).trigger('changeScenario', [scenario]);
    };

    return Start;

});
