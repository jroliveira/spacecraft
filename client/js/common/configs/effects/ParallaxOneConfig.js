define([
    'infrastructure/components/ImgContinuous'
], function (ImgContinuous) {

    function ParallaxOneConfig() { }

    ParallaxOneConfig.image = { src: '../../client/img/parallax/parallax1.png' };

    ParallaxOneConfig.pos = { x: 0 };
    
    ParallaxOneConfig.speed = 10;

    ParallaxOneConfig.width = 800;
    
    ParallaxOneConfig.canvas = { width: 895, height: 600 };

    ParallaxOneConfig.components = [ImgContinuous];

    return ParallaxOneConfig;

});