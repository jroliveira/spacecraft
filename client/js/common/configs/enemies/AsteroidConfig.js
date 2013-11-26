define([], function () {

    function AsteroidConfig() { }

    AsteroidConfig.width = 95;

    AsteroidConfig.height = 93;

    AsteroidConfig.health = 10;
    
    AsteroidConfig.damage = 20;

    AsteroidConfig.speed = 1.5;
    
    AsteroidConfig.canvas = { width: 895, height: 600 };
    
    AsteroidConfig.showHealthBar = true;
    
    return AsteroidConfig;

});