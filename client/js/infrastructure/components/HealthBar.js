define([
    'infrastructure/components/Component'
], function (Component) {

    function HealthBar(entity, context) {
        this.entity = entity;

        this.context = context;

        this.maxHealth = entity.health;
        this.maxWidth = entity.config.width;
    }

    HealthBar.prototype = new Component();

    HealthBar.prototype.fill = function (x, y, width, height, color) {
        this.context.beginPath();
        this.context.rect(x, y, width, height);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
    };

    HealthBar.prototype.draw = function () {
        var x = this.entity.pos.x;
        var y = this.entity.pos.y - 5;
        var width = this.entity.config.width + 2;
        var height = 5 + 2;
        var color = "white";

        this.fill(x, y, width, height, color);

        x = this.entity.pos.x + 1;
        y = this.entity.pos.y - 5 + 1;
        width = this.maxWidth * this.entity.health / this.maxHealth;
        height = 5;
        color = "red";

        this.fill(x, y, width, height, color);
    };

    return HealthBar;

});