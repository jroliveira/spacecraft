define([], function () {

    function Background(imageName, value) {
        this.image = new Image();
        this.image.src = "../../client/img/background/" + imageName + ".png";

        this.pos = { x: 0 };

        this.speedy = value;
    }

    Background.prototype.draw = function (context) {
        context.drawImage(this.image, this.pos.x, 0);
        context.drawImage(this.image, this.pos.x + this.image.width, 0);
    };

    Background.prototype.updates = function () {
        if ((Math.abs(this.pos.x) + 895) < this.image.width) {
            this.pos.x = this.pos.x - this.speedy;
        }
    };

    Background.prototype.ended = function () {
        return (Math.abs(this.pos.x)  + 895) >= this.image.width;
    };

    return Background;

});