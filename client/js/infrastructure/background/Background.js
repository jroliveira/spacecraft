define([], function () {

    function Background(imageName, value) {
        this.image = new Image();
        this.image.src = "../../client/img/scenarios/" + imageName + ".png";

        this.pos = { x: 0 };

        this.speed = value;
    }

    Background.prototype.draw = function (context) {
        context.drawImage(this.image, this.pos.x, 0);
        context.drawImage(this.image, this.pos.x + this.width(), 0);
    };

    Background.prototype.updates = function () {
        if ((Math.abs(this.pos.x) + 895) < this.width()) {
            this.pos.x = this.pos.x - this.speed;
        }
    };
    
    Background.prototype.width = function () {
        return 3091;
    };

    Background.prototype.ended = function () {
        return (Math.abs(this.pos.x)  + 895) >= this.width();
    };

    return Background;

});