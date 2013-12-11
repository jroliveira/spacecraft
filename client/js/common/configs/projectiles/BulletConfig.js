define([
    'infrastructure/components/Img'
], function (Img) {

    function BulletConfig() { }
    
    // Domain

    BulletConfig.health = 1;

    BulletConfig.damage = 3;

    BulletConfig.speed = 3;
    
    // Component

    BulletConfig.components = [Img];

    BulletConfig.image = { src: '../../client/img/projectiles/bullet.png' };

    // Config

    BulletConfig.width = 9;

    BulletConfig.height = 8;
    
    BulletConfig.canvas = { width: 895, height: 600 };
    
    return BulletConfig;

});