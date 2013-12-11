define([
    'infrastructure/components/HealthBar',
    'infrastructure/components/Img'
], function (HealthBar, Img) {

    function AsteroidConfig() { }

    // Domain

    AsteroidConfig.health = 10;

    AsteroidConfig.damage = 20;

    AsteroidConfig.speed = 1.5;
    
    // Component

    AsteroidConfig.components = [Img, HealthBar];

    AsteroidConfig.image = { src: '../../client/img/enemies/asteroid.png' };

    // Config

    AsteroidConfig.width = 95;

    AsteroidConfig.height = 93;

    AsteroidConfig.canvas = { width: 895, height: 600 };
    
    return AsteroidConfig;

});