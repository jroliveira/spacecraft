define([], function () {

    function MissileConfig() { }
    
    MissileConfig.width = 51;

    MissileConfig.height = 10;

    MissileConfig.health = 1;
    
    MissileConfig.damage = 5;

    MissileConfig.speed = 5;
    
    MissileConfig.canvas = { width: 895, height: 600 };
    
    MissileConfig.showHealthBar = false;
    
    return MissileConfig;

});