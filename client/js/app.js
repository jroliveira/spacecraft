define([
    'jquery',
    'domain/Game'
], function ($, Game) {
    
    return {
        initialize: function () {
            var $canvas = ($('canvas'))[0];
            var game = new Game($canvas);

            function loop() {
                game.updates();

                window.setTimeout(loop, 1000 / 60);
            }

            game.start();

            loop();
        }
    };
    
});
