define([], function () {

    function Parallax(config) {
        this.config = config;
        
        this.pos = config.pos;

        this.image = new Image();
        this.image.src = "../../client/img/parallax/" + config.image.name + ".png";
    }

    Parallax.prototype.draw = function (context) {
        context.drawImage(this.image, this.pos.x, 0);
        context.drawImage(this.image, this.pos.x + this.config.width, 0);
    };

    Parallax.prototype.updates = function () {
        this.pos.x = (Math.abs(this.pos.x) >= this.config.width) ? 0 : this.pos.x - this.config.speed;
    };

    return Parallax;

});