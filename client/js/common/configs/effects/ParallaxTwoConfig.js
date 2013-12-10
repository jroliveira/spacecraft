define([
    'infrastructure/components/ImgContinuous'
], function (ImgContinuous) {

    function ParallaxTwoConfig() { }

    ParallaxTwoConfig.image = { src: '../../client/img/parallax/parallax2.png' };

    ParallaxTwoConfig.pos = { x: 0 };
    
    ParallaxTwoConfig.speed = 5;

    ParallaxTwoConfig.width = 800;
    
    ParallaxTwoConfig.canvas = { width: 895, height: 600 };
    
    ParallaxTwoConfig.components = [ImgContinuous];

    return ParallaxTwoConfig;

});