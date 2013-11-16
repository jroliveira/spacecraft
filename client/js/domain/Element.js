define([], function () {

    function Element() { }

    Element.prototype.draw = function (context) {
        if (this.showHealthBar()) {
            this.healthBar.draw(context);
        }

        context.drawImage(this.image, this.pos.x, this.pos.y);
    };

    // Damage

    Element.prototype.damages = function (damage) {
        var health = this.health - damage;

        this.setHealth(health);
    };
    
    Element.prototype.destroyed = function () {
        return this.health <= 0;
    };
    
    
    // Health

    Element.prototype.setHealth = function (health) {
        this.health = health;
        
        this.healthBar.updates(this.health);
    };

    Element.prototype.showHealthBar = function () {
        return true;
    };
    
    // Config

    Element.prototype.width = function () {
        return this.image.width;
    };

    Element.prototype.height = function () {
        return this.image.height;
    };

    // Collision

    Element.prototype.horizontal = function () {
        return this.pos.x + this.width();
    };

    Element.prototype.vertical = function () {
        return this.pos.y + this.height();
    };

    Element.prototype.collided = function (obstacle) {
        return (this.pos.x <= obstacle.horizontal()
            && obstacle.pos.x <= this.horizontal()
            && this.pos.y <= obstacle.vertical()
            && obstacle.pos.y <= this.vertical());
    };

    return Element;

});