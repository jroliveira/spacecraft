define([
    'jquery',
    'libs/raf/requestAnimationFrame',

    'infrastructure/inputs/Keyboard',

    'infrastructure/data/Store',

    'common/configs/scenarios/MainConfig',
    'common/configs/scenarios/LoadingConfig',
    'common/configs/phases/FirstPhaseConfig',
    'common/configs/phases/StarbasePhaseConfig',

    'domain/scenarios/Main',
    'domain/scenarios/Loading',
    'domain/scenarios/Start',
    'domain/phases/FirstPhase',
    'domain/phases/StarbasePhase'
], function (
    $,
    raf,
    
    Keyboard,

    store,

    MainConfig,
    LoadingConfig,
    FirstPhaseConfig,
    StarbasePhaseConfig,

    Main,
    Loading,
    Start,
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
            
            var input = new Keyboard();
            input.bind();

            function scenarioLoop() {
                window.requestAnimationFrame(scenarioLoop);

                scenario.updates();
                scenario.draw();
            }
            
            $(document).on('phaseEnded', function () {
                phase = new StarbasePhase(StarbasePhaseConfig);
                scenario = new Main(context, phase, MainConfig);
                scenario.start();
            });
            
            $(document).on('mainPhase', function () {
                phase = new FirstPhase(FirstPhaseConfig);
                scenario = new Main(context, phase, MainConfig);
                scenario.start();
            });

            var context = ($('canvas'))[0].getContext('2d');
            var scenario = new Loading(context, LoadingConfig);
            scenario.start();
            
            var phase;
            
            scenarioLoop();

            $.when(
                
                this.wait(3000),
                store.initialize()

            ).then(function () {

                scenario = new Start(context, MainConfig);
                scenario.start();
                
            });
        }

    };

});
