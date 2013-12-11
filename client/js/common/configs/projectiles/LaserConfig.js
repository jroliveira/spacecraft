define([
    'infrastructure/components/Img'
], function (Img) {

    function LaserConfig() { }

    // Domain

    LaserConfig.health = 1;

    LaserConfig.damage = 10;

    LaserConfig.speed = 7;
    
    // Component

    LaserConfig.components = [Img];

    LaserConfig.image = { src: '../../client/img/projectiles/laser.png' };

    // Config

    LaserConfig.width = 39;

    LaserConfig.height = 17;
    
    LaserConfig.canvas = { width: 895, height: 600 };
    
    return LaserConfig;

});