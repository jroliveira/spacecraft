define([], function () {
    
    function HealthBar(element) {
        this.element = element;

        this.health = element.health;
        
        this.maxHealth = element.health;
        this.maxWidth = element.width();
        this.height = 5;
    }

    HealthBar.prototype.updates = function (health) {
        this.health = health;
    };

    HealthBar.prototype.draw = function (context) {
        context.beginPath();
        context.rect(this.initPosX(), this.initPosY(), this.maxWidth, this.height);
        context.fillStyle = "white";
        context.fill();
        context.closePath();

        context.beginPath();
        var width = this.maxWidth * this.health / this.maxHealth;
        context.rect(this.initPosX(), this.initPosY(), width, this.height);
        context.fillStyle = "red";
        context.fill();
        context.closePath();
    };
    
    // Config

    HealthBar.prototype.initPosX = function () {
        return this.element.pos.x;
    };

    HealthBar.prototype.initPosY = function () {
        return this.element.pos.y - 5;
    };

    return HealthBar;

});