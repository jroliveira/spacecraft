define([], function () {

    function SoldierConfig() { }
    
    SoldierConfig.image = { width: 32, height: 32 };

    SoldierConfig.pos = { x: 1, y: 10 };

    SoldierConfig.sprite = { row: 0, col: 0 };

    SoldierConfig.width = SoldierConfig.image.width * 1.5;

    SoldierConfig.height = SoldierConfig.image.height * 1.5;

    SoldierConfig.health = 50;

    SoldierConfig.damage = 100;

    return SoldierConfig;

});