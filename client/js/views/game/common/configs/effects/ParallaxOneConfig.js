define([
    'views/game/infrastructure/components/ImgContinuous'
], function (ImgContinuous) {

    function ParallaxOneConfig() { }
    
    // Domain

    ParallaxOneConfig.speed = 10;

    // Component

    ParallaxOneConfig.components = [
        { type: ImgContinuous, src: '../../client/img/parallax/parallax1.png' }
    ];

    // Config

    ParallaxOneConfig.width = 1170;

    ParallaxOneConfig.canvas = { width: 1170, height: 600 };

    ParallaxOneConfig.pos = { x: 0 };
    
    return ParallaxOneConfig;

});