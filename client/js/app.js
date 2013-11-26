define([
    'jquery',
    'domain/scenarios/Space',
    'domain/scenarios/Land'
], function ($, Space, Land) {
    
    return {
        initialize: function () {
            var $canvas = ($('canvas'))[0];
            var context = $canvas.getContext('2d');
            
            var fase = new Space($canvas, context);
            $(document).on('phaseEnded', function() {
                fase = new Land($canvas, context);
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
