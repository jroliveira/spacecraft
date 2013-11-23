define([
    'domain/Entity'
], function (Entity) {

    function Enemy() { }

    Enemy.prototype = new Entity();

    Enemy.prototype.updates = function () {
        if (this.pos.x <= 0) {
            this.setHealth(0);
        } else {
            this.pos.x = this.pos.x - this.config.speed;
        }
    };
    
    // Config

    Enemy.prototype.initPos = function () {
        var min = 1;
        var max = 600 - this.config.height;
        var posY = Math.floor(Math.random() * (max - min + 1)) + min;
        
        return { x: 895, y: posY };
    };

    return Enemy;

});