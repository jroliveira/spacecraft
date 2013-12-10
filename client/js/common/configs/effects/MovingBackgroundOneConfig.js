define([
    'infrastructure/components/ImgContinuous'
], function (ImgContinuous) {

    function MovingBackgroundOneConfig() { }

    MovingBackgroundOneConfig.image = { src: '../../client/img/backgrounds/background1.png' };

    MovingBackgroundOneConfig.pos = { x: 0 };
    
    MovingBackgroundOneConfig.speed = 2.5;

    MovingBackgroundOneConfig.width = 3091;
    
    MovingBackgroundOneConfig.canvas = { width: 895, height: 600 };
    
    MovingBackgroundOneConfig.components = [ImgContinuous];

    return MovingBackgroundOneConfig;

});