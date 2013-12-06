define([
    'infrastructure/components/Img'
], function (Img) {

    function BulletConfig() { }
    
    BulletConfig.width = 9;

    BulletConfig.height = 8;

    BulletConfig.health = 1;
    
    BulletConfig.damage = 3;

    BulletConfig.speed = 3;
    
    BulletConfig.canvas = { width: 895, height: 600 };
    
    BulletConfig.showHealthBar = false;
    
    BulletConfig.components = [Img];
    
    BulletConfig.image = { src: '../../client/img/munitions/bullet.png' };
    
    return BulletConfig;

});