define([
    'jquery',
    'domain/Game'
], function ($, Game) {
    
    return {
        initialize: function () {
            var $canvas = ($('canvas'))[0];
            var context = $canvas.getContext('2d');
            
            var game = new Game($canvas, context);

            function loop() {
                game.updates();
                if (game.ended) {
                    context.font = "40pt Calibri";
                    context.fillStyle = "white";
                    context.textAlign = "center";
                    context.textBaseline = "middle";
                    
                    context.fillText("Fim da fase!", $canvas.width / 2, 120);
                    
                    return;
                }

                window.setTimeout(loop, 1000 / 60);
            }

            game.start();

            loop();
        }
    };
    
});
