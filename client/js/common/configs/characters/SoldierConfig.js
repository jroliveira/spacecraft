define([
    'infrastructure/components/HealthBar',
    'infrastructure/components/Sprite'
], function (HealthBar, Sprite) {

    function SoldierConfig() { }
    
    SoldierConfig.image = { width: 32, height: 32 };

    SoldierConfig.pos = { x: 1, y: 10 };

    SoldierConfig.sprite = { row: 0, col: 0, src: '../../client/img/characters/soldierSprite.png' };

    SoldierConfig.width = SoldierConfig.image.width * 1.5;

    SoldierConfig.height = SoldierConfig.image.height * 1.5;

    SoldierConfig.health = 50;

    SoldierConfig.damage = 100;
    
    SoldierConfig.speed = { up: 2, left: 2, right: 2, down: 2 };

    SoldierConfig.canvas = { width: 895, height: 600 };
    
    SoldierConfig.showHealthBar = false;
    
    SoldierConfig.components = [Sprite, HealthBar];

    return SoldierConfig;

});