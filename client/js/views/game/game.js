define([
    'jquery',
    'wait',

    'views/game/infrastructure/inputs/Keyboard',
    'views/game/infrastructure/data/Store',

    'views/game/domain/scenarios/Loading',
    'views/game/domain/scenarios/Start'
], function (
    $,
    wait,
    
    Keyboard,
    store,

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

            var startConfig,
                loadingConfig,
                self = this,
                context = ($('canvas'))[0].getContext('2d'),
                input = new Keyboard();
            
            input.bind();
            
            $.when(

                store.initialize()                

            ).then(function () {

                $.when(
                    
                    $.wait(10),
                
                    store.getBy('scenarios', 'loading', function (data) {
                        loadingConfig = data;
                    }),
                    
                    store.getBy('scenarios', 'start', function (data) {
                        startConfig = data;
                    })

                ).then(function () {

                    self.changeScenario(null, new Loading(context, loadingConfig));
                    
                    scenarioLoop();

                    $.when(

                        $.wait(3000)

                    ).then(function () {

                        self.changeScenario(null, new Start(context, startConfig));

                    });

                });
                
            });
        },
        
        changeScenario: function(event, newScenario) {
            scenario = newScenario;
            scenario.start();
        }

    };

});
