define([
    'jquery',
    'underscore',
    'wait',
    
    'views/game/infrastructure/data/Store',

    'views/game/infrastructure/components/Text',

    'views/game/domain/scenarios/Scenario',
    'views/game/domain/scenarios/Main',
    'views/game/domain/phases/FirstPhase'
], function (
    $,
    _,
    wait,
     
    store,

    Text,

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
        if (!pressed) return;

        var phase,
            mainConfig,
            self = this;
        
        $.when(
            
            $.wait(1000),
            
            store.getBy('phases', 'first', function (data) {
                phase = new FirstPhase(data);
            }),
            
            store.getBy('scenarios', 'main', function (data) {
                mainConfig = data;
            })
        
        ).then(function () {
            
            var scenario = new Main(self.context, mainConfig, phase);
            $(document).trigger('changeScenario', [scenario]);
            
        });
    };

    return Start;

});
