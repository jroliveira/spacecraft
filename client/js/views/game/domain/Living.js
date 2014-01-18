define([
    'views/game/domain/Entity'
], function (Entity) {

    function Living() { }

    Living.prototype = new Entity();

    Living.prototype.destroyed = function () {
        return this.health <= 0;
    };

    return Living;

});