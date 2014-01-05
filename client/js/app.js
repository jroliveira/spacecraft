define([
    'jquery',
    'libs/raf/requestAnimationFrame',

    'infrastructure/inputs/Keyboard',
    'infrastructure/data/Store',

    'common/configs/scenarios/StartConfig',
    'common/configs/scenarios/LoadingConfig',

    'domain/scenarios/Loading',
    'domain/scenarios/Start'
], function (
    $,
    raf,
    
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
        
        wait: function(time) {
            var defer = $.Deferred();

            setTimeout(function () { defer.resolve(); }, time);

            return defer.promise();
        },
        
        initialize: function () {
            $(document).on('changeScenario', this.changeScenario);

            var self = this,
                context = ($('canvas'))[0].getContext('2d'),
                input = new Keyboard();
            
            input.bind();
            this.changeScenario(null, new Loading(context, LoadingConfig));
            
            scenarioLoop();

            $.when(
                
                this.wait(3000),
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
