define([
    'domain/Entity'
], function (Entity) {

    function Munitions() { }

    Munitions.prototype = new Entity();

    Munitions.prototype.updates = function () {
        var width = 895 - this.config.width;
        
        if (this.pos.x >= width) {
            this.setHealth(0);
        } else {
            this.pos.x = this.pos.x + this.config.speed;
        }
    };
    
    // Health
    
    Munitions.prototype.showHealthBar = function () {
        return false;
    };

    return Munitions;

});