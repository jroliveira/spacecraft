define([
    'infrastructure/components/ImgContinuous'
], function (ImgContinuous) {

    function ParallaxOneConfig() { }
    
    // Domain

    ParallaxOneConfig.speed = 10;

    // Component

    ParallaxOneConfig.components = [ImgContinuous];

    ParallaxOneConfig.image = { src: '../../client/img/parallax/parallax1.png' };

    // Config

    ParallaxOneConfig.width = 800;

    ParallaxOneConfig.canvas = { width: 895, height: 600 };

    ParallaxOneConfig.pos = { x: 0 };
    
    return ParallaxOneConfig;

});