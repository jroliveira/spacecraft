define([
    'jquery',
    
    'common/configs/scenarios/ScenarioConfig',

    'domain/scenarios/Space',
    'domain/scenarios/Land'
], function ($, ScenarioConfig, Space, Land) {
    
    return {
        initialize: function () {
            var $canvas = ($('canvas'))[0];
            var context = $canvas.getContext('2d');
            
            var fase = new Space(context, ScenarioConfig);
            $(document).on('phaseEnded', function() {
                fase = new Land(context, ScenarioConfig);
                fase.start();
            });

            function loop() {
                fase.updates();

                window.setTimeout(loop, 1000 / 60);
            }

            fase.start();

            loop();
        }
    };
    
});
