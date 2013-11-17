define([
    'jquery',
    'domain/space/Space',
    'domain/land/Land'
], function ($, Space, Land) {
    
    return {
        initialize: function () {
            var $canvas = ($('canvas'))[0];
            var context = $canvas.getContext('2d');
            
            var fase = new Space($canvas, context);
            //var fase = new Land($canvas, context);

            function loop() {
                fase.updates();
                if (fase.ended) {
                    //context.font = "40pt Calibri";
                    //context.fillStyle = "white";
                    //context.textAlign = "center";
                    //context.textBaseline = "middle";
                    
                    //context.fillText("Fim da fase!", $canvas.width / 2, 120);
                    
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
