define([
    'domain/space/Element'
], function (Element) {

    function Ammunition() { }

    Ammunition.prototype = new Element();

    Ammunition.prototype.updates = function () {
        var width = 895 - this.width();
        
        if (this.pos.x >= width) {
            this.setHealth(0);
        } else {
            this.pos.x = this.pos.x + this.speedy;
        }
    };
    
    // Health
    
    Ammunition.prototype.showHealthBar = function () {
        return false;
    };
    
    // Config
    
    Ammunition.prototype.initHealth = function () {
        return 1;
    };

    return Ammunition;

});