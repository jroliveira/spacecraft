define([
    'infrastructure/components/HealthBar',
    'infrastructure/components/Sprite'
], function (HealthBar, Sprite) {

    function ShipConfig() { }
    
    // Domain

    ShipConfig.health = 50;

    ShipConfig.damage = 100;

    ShipConfig.speed = { up: 2, left: 2, right: 2, down: 2 };
    
    // Component

    ShipConfig.components = [Sprite, HealthBar];

    ShipConfig.image = { width: 43, height: 39, src: '../../client/img/characters/shipSprite.png' };

    // Config

    ShipConfig.width = ShipConfig.image.width * 1.5;

    ShipConfig.height = ShipConfig.image.height * 1.5;
    
    ShipConfig.canvas = { width: 895, height: 600 };
    
    ShipConfig.pos = { x: 1, y: 10 };

    ShipConfig.sprite = { row: 0, col: 0 };

    return ShipConfig;

});