define([
    'jquery',
    
    'infrastructure/data/Store',

    'common/configs/scenarios/ScenarioConfig',
    'common/configs/phases/FirstPhaseConfig',
    'common/configs/phases/StarbasePhaseConfig',

    'domain/scenarios/Scenario',
    'domain/phases/FirstPhase',
    'domain/phases/StarbasePhase'
], function (
    $,
    
    Store,
    
    ScenarioConfig,
    FirstPhaseConfig,
    StarbasePhaseConfig,
    
    Scenario,
    FirstPhase,
    StarbasePhase
) {
    
    return {

        initialize: function () {
            Store.initialize();
            
            this.start();
        },
        
        start: function() {
            $(document).on('phaseEnded', function () {
                fase = new StarbasePhase(StarbasePhaseConfig);

                scenario = new Scenario(context, fase, ScenarioConfig);
                scenario.start();
            });

            function loop() {
                scenario.phase.updates();
                scenario.draw();

                window.setTimeout(loop, 1000 / 60);
            }

            var context = ($('canvas'))[0].getContext('2d');

            // Começa o jogo.

            var fase = new FirstPhase(FirstPhaseConfig);

            var scenario = new Scenario(context, fase, ScenarioConfig);
            scenario.start();

            loop();
        }
    };
    
});
