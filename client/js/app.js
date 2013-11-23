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

            function loop() {
                fase.updates();
                if (fase.ended) {
                    fase = new Land($canvas, context);
                    fase.start();
                }

                window.setTimeout(loop, 1000 / 60);
            }

            fase.start();

            loop();
        }
    };
    
});
