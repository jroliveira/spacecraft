define([
    'jquery',
    'wait',

    'views/game/infrastructure/inputs/Keyboard',
    'views/game/infrastructure/data/Store',

    'views/game/common/configs/scenarios/StartConfig',
    'views/game/common/configs/scenarios/LoadingConfig',

    'views/game/domain/scenarios/Loading',
    'views/game/domain/scenarios/Start'
], function (
    $,
    wait,
    
    Keyboard,
    store,

    StartConfig,
    LoadingConfig,

    Loading,
    Start
) {
    
    var scenario;

    function scenarioLoop() {
        window.requestAnimationFrame(scenarioLoop);

        scenario.updates();
        scenario.draw();
    }

    return {
        
        initialize: function () {
            $(document).on('changeScenario', this.changeScenario);

            var self = this,
                context = ($('canvas'))[0].getContext('2d'),
                input = new Keyboard();
            
            input.bind();
            this.changeScenario(null, new Loading(context, LoadingConfig));
            
            scenarioLoop();

            $.when(
                
                $.wait(3000),
                store.initialize()

            ).then(function () {

                self.changeScenario(null, new Start(context, StartConfig));
                
            });
        },
        
        changeScenario: function(event, newScenario) {
            scenario = newScenario;
            scenario.start();
        }

    };

});
