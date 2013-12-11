define([
    'infrastructure/components/ImgContinuous'
], function (ImgContinuous) {

    function MovingBackgroundOneConfig() { }

    // Domain

    MovingBackgroundOneConfig.speed = 2.5;
    
    // Component

    MovingBackgroundOneConfig.components = [ImgContinuous];

    MovingBackgroundOneConfig.image = { src: '../../client/img/backgrounds/background1.png' };

    // Config

    MovingBackgroundOneConfig.width = 3091;

    MovingBackgroundOneConfig.canvas = { width: 895, height: 600 };

    MovingBackgroundOneConfig.pos = { x: 0 };
    
    return MovingBackgroundOneConfig;

});