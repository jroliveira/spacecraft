define([
    'jquery',
    'libs/raf/requestAnimationFrame',

    'infrastructure/data/Store',
    'infrastructure/components/Loader',

    'common/configs/scenarios/ScenarioConfig',
    'common/configs/phases/FirstPhaseConfig',
    'common/configs/phases/StarbasePhaseConfig',

    'domain/scenarios/Main',
    'domain/phases/FirstPhase',
    'domain/phases/StarbasePhase'
], function (
    $,
    raf,

    store,
    Loader,

    ScenarioConfig,
    FirstPhaseConfig,
    StarbasePhaseConfig,

    Main,
    FirstPhase,
    StarbasePhase
) {

    return {
        
        wait: function(time) {
            var defer = $.Deferred();

            setTimeout(function () { defer.resolve(); }, time);

            return defer.promise();
        },
        
        initialize: function () {
            
            function scenarioLoop() {
                window.requestAnimationFrame(scenarioLoop);

                scenario.updates();
                scenario.draw();
            }
            
            $(document).on('phaseEnded', function () {
                phase = new StarbasePhase(StarbasePhaseConfig);

                scenario = new Main(context, phase, ScenarioConfig);
                scenario.start();
            });

            var context = ($('canvas'))[0].getContext('2d');
            var scenario = new Loader(context);
            var phase;
            
            scenarioLoop();

            $.when(
                
                this.wait(3000),
                store.initialize()

            ).then(function () {
                
                phase = new FirstPhase(FirstPhaseConfig);
                scenario = new Main(context, phase, ScenarioConfig);
                scenario.start();
                
            });
        }

    };

});
