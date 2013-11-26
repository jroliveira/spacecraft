define([
    'domain/Entity'
], function (Entity) {

    function Living() { }

    Living.prototype = new Entity();

    Living.prototype.draw = function (context) {
        if (this.config.showHealthBar) {
            this.healthBar.draw(context);
        }

        context.drawImage(this.image, this.pos.x, this.pos.y);
    };

    // Health

    Living.prototype.setHealth = function (health) {
        this.health = health;

        this.healthBar.updates(this.health);
    };

    Living.prototype.destroyed = function () {
        return this.health <= 0;
    };

    return Living;

});