define([
    'infrastructure/components/Img'
], function (Img) {

    function LaserConfig() { }

    LaserConfig.width = 39;

    LaserConfig.height = 17;

    LaserConfig.health = 1;
    
    LaserConfig.damage = 10;

    LaserConfig.speed = 7;
    
    LaserConfig.canvas = { width: 895, height: 600 };
    
    LaserConfig.showHealthBar = false;
    
    LaserConfig.components = [Img];
    
    LaserConfig.image = { src: '../../client/img/munitions/laser.png' };
    
    return LaserConfig;

});