define([
    'infrastructure/HealthBar',
    'infrastructure/components/Sprite'
], function (HealthBar, Sprite) {

    function ShipConfig() { }
    
    ShipConfig.image = { width: 43, height: 39 };

    ShipConfig.pos = { x: 1, y: 10 };

    ShipConfig.sprite = { row: 0, col: 0, src: '../../client/img/characters/shipSprite.png' };

    ShipConfig.width = ShipConfig.image.width * 1.5;

    ShipConfig.height = ShipConfig.image.height * 1.5;

    ShipConfig.health = 50;

    ShipConfig.damage = 100;

    ShipConfig.speed = { up: 2, left: 2, right: 2, down: 2 };

    ShipConfig.canvas = { width: 895, height: 600 };

    ShipConfig.showHealthBar = false;

    ShipConfig.components = [Sprite, HealthBar];

    return ShipConfig;

});