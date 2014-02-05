define([
    'views/game/infrastructure/components/ImgContinuous'
], function (ImgContinuous) {

    function MovingBackgroundOneConfig() { }

    // Domain

    MovingBackgroundOneConfig.speed = 2.5;
    
    // Component

    MovingBackgroundOneConfig.components = [
        { type: ImgContinuous, src: 'backgrounds_background1.png' }
    ];

    // Config

    MovingBackgroundOneConfig.width = 3091;

    MovingBackgroundOneConfig.canvas = { width: 1170, height: 600 };

    MovingBackgroundOneConfig.pos = { x: 0 };
    
    return MovingBackgroundOneConfig;

});