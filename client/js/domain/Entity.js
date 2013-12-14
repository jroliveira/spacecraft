define([], function () {

    function Entity() { }

    Entity.prototype.updates = function () { };

    // Collision

    Entity.prototype.horizontal = function () {
        return this.pos.x + this.config.width;
    };

    Entity.prototype.vertical = function () {
        return this.pos.y + this.config.height;
    };

    Entity.prototype.resolvesCollision = function (obstacle) { };

    Entity.prototype.collidedWith = function (obstacle) {
        return (this.pos.x <= obstacle.horizontal()
            && obstacle.pos.x <= this.horizontal()
            && this.pos.y <= obstacle.vertical()
            && obstacle.pos.y <= this.vertical());
    };

    return Entity;

});