define([
    'views/game/infrastructure/components/ImgContinuous'
], function (ImgContinuous) {

    function ParallaxTwoConfig() { }

    // Domain

    ParallaxTwoConfig.speed = 5;
    
    // Component

    ParallaxTwoConfig.components = [ImgContinuous];

    ParallaxTwoConfig.image = { src: '../../client/img/parallax/parallax2.png' };

    // Config

    ParallaxTwoConfig.width = 1170;

    ParallaxTwoConfig.canvas = { width: 1170, height: 600 };

    ParallaxTwoConfig.pos = { x: 0 };

    return ParallaxTwoConfig;

});