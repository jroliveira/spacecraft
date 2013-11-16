define([
    'domain/Element'
], function (Element) {

    function Enemy() { }

    Enemy.prototype = new Element();

    Enemy.prototype.updates = function () {
        if (this.pos.x <= 0) {
            this.setHealth(0);
        } else {
            this.pos.x = this.pos.x - this.speedy;
        }
    };
    
    // Config

    Enemy.prototype.initPosX = function () {
        return 895;
    };

    Enemy.prototype.initPosY = function () {
        var min = 1;
        var max = 600 - this.height();

        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return Enemy;

});