define([], function () {

    function Entity() { }

    Entity.prototype.draw = function (context) {
        if (this.showHealthBar()) {
            this.healthBar.draw(context);
        }

        context.drawImage(this.image, this.pos.x, this.pos.y);
    };

    // Damage

    Entity.prototype.damages = function (damage) {
        var health = this.health - damage;

        this.setHealth(health);
    };
    
    Entity.prototype.destroyed = function () {
        return this.health <= 0;
    };
    
    // Health

    Entity.prototype.setHealth = function (health) {
        this.health = health;
        
        this.healthBar.updates(this.health);
    };

    Entity.prototype.showHealthBar = function () {
        return true;
    };

    // Collision

    Entity.prototype.horizontal = function () {
        return this.pos.x + this.config.width;
    };

    Entity.prototype.vertical = function () {
        return this.pos.y + this.config.height;
    };

    Entity.prototype.collided = function (obstacle) {
        return (this.pos.x <= obstacle.horizontal()
            && obstacle.pos.x <= this.horizontal()
            && this.pos.y <= obstacle.vertical()
            && obstacle.pos.y <= this.vertical());
    };

    return Entity;

});