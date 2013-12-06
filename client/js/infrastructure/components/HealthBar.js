define([
    'infrastructure/components/Component'
], function (Component) {

    function HealthBar(entity) {
        this.entity = entity;

        this.maxHealth = entity.health;
        this.maxWidth = entity.config.width;
    }

    HealthBar.prototype = new Component();

    HealthBar.prototype.fill = function (x, y, width, height, color, context) {
        context.beginPath();
        context.rect(x, y, width, height);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    };

    HealthBar.prototype.draw = function (context) {
        var x = this.entity.pos.x;
        var y = this.entity.pos.y - 5;
        var width = this.entity.config.width + 2;
        var height = 5 + 2;
        var color = "white";

        this.fill(x, y, width, height, color, context);

        x = this.entity.pos.x + 1;
        y = this.entity.pos.y + 1;
        width = this.maxWidth * this.entity.health / this.maxHealth;
        height = 5;
        color = "red";

        this.fill(x, y, width, height, color, context);
    };

    return HealthBar;

});