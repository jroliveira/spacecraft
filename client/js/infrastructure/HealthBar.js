define([], function () {
    
    function HealthBar(entity) {
        this.entity = entity;

        this.health = entity.health;
        
        this.maxHealth = entity.health;
        this.maxWidth = entity.config.width;
        this.height = 5;
    }

    HealthBar.prototype.updates = function (health) {
        this.health = health;
    };

    HealthBar.prototype.draw = function (context) {
        context.beginPath();
        context.rect(this.initPosX(), this.initPosY(), this.maxWidth + 2, this.height + 2);
        context.fillStyle = "white";
        context.fill();
        context.closePath();

        context.beginPath();
        var width = this.maxWidth * this.health / this.maxHealth;
        context.rect(this.initPosX() + 1, this.initPosY() + 1, width, this.height);
        context.fillStyle = "red";
        context.fill();
        context.closePath();
    };
    
    // Config

    HealthBar.prototype.initPosX = function () {
        return this.entity.pos.x;
    };

    HealthBar.prototype.initPosY = function () {
        return this.entity.pos.y - 5;
    };

    return HealthBar;

});