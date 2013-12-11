define([
    'infrastructure/components/Img'
], function (Img) {

    function StarbaseConfig() { }
    
    // Component

    StarbaseConfig.components = [Img];

    StarbaseConfig.image = { src: '../../client/img/starbase.png' };

    // Config

    StarbaseConfig.width = 250;

    StarbaseConfig.height = 140;

    StarbaseConfig.canvas = { width: 895, height: 600 };
    
    StarbaseConfig.pos = { x: 630, y: 450 };
    
    return StarbaseConfig;

});