define([], function () {

    function BulletConfig() { }
    
    BulletConfig.width = 9;

    BulletConfig.height = 8;

    BulletConfig.health = 1;
    
    BulletConfig.damage = 3;

    BulletConfig.speed = 3;
    
    BulletConfig.canvas = { width: 895, height: 600 };
    
    BulletConfig.showHealthBar = false;
    
    return BulletConfig;

});