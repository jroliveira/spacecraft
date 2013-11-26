define([], function () {

    function Entity() { }

    Entity.prototype.updates = function () { };

    Entity.prototype.draw = function (context) {
        context.drawImage(this.image, this.pos.x, this.pos.y);
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