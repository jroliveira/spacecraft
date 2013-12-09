define([
    'jquery',
    
    'common/configs/scenarios/ScenarioConfig',

    'domain/scenarios/Scenario',
    'domain/phases/FirstPhase',
    'domain/phases/StarbasePhase'
], function ($, ScenarioConfig, Scenario, FirstPhase, StarbasePhase) {
    
    return {
        initialize: function () {
            $(document).on('phaseEnded', function () {
                fase = new StarbasePhase();

                scenario = new Scenario(context, fase, ScenarioConfig);
                scenario.start();
            });

            function loop() {
                scenario.draw();
                window.setTimeout(loop, 1000 / 60);
            }
            
            var context = ($('canvas'))[0].getContext('2d');

            // Começa o jogo.
            
            var fase = new FirstPhase();

            var scenario = new Scenario(context, fase, ScenarioConfig);
            scenario.start();

            loop();
        }
    };
    
});
