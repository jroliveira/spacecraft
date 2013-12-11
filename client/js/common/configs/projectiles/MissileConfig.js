define([
    'infrastructure/components/Img'
], function (Img) {

    function MissileConfig() { }

    // Domain

    MissileConfig.health = 1;

    MissileConfig.damage = 5;

    MissileConfig.speed = 5;
    
    // Component

    MissileConfig.components = [Img];

    MissileConfig.image = { src: '../../client/img/projectiles/missile.png' };

    // Config

    MissileConfig.width = 51;

    MissileConfig.height = 10;

    MissileConfig.canvas = { width: 895, height: 600 };
    
    return MissileConfig;

});