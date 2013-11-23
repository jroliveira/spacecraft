define([], function () {

    function ShipConfig() { }
    
    ShipConfig.image = { width: 43, height: 39 };

    ShipConfig.pos = { x: 1, y: 10 };

    ShipConfig.sprite = { row: 0, col: 0 };

    ShipConfig.width = ShipConfig.image.width * 1.5;

    ShipConfig.height = ShipConfig.image.height * 1.5;

    ShipConfig.health = 50;

    ShipConfig.damage = 100;

    return ShipConfig;

});