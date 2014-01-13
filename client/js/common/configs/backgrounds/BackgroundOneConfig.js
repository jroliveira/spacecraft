define([
    'infrastructure/components/Img'
], function (Img) {

    function BackgroundOneConfig() { }

    // Component

    BackgroundOneConfig.components = [Img];

    BackgroundOneConfig.image = { src: '../../client/img/starbase.png' };

    // Config

    BackgroundOneConfig.width = 250;

    BackgroundOneConfig.height = 140;

    BackgroundOneConfig.canvas = { width: 895, height: 600 };

    BackgroundOneConfig.pos = { x: 1, y: 1 };
    
    return BackgroundOneConfig;

});