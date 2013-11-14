define([], function () {

    var background = (function () {

        function Background(imageName, value) {
            this.speedy = value;
            this.pos = { x: 0 };
            
            this.image = new Image();
            this.image.src = "../../client/img/" + imageName + ".png";
        }

        Background.prototype.width = function () {
            return this.image.width;
        };

        Background.prototype.height = function () {
            return this.image.height;
        };

        Background.prototype.draw = function(context) {
            context.drawImage(this.image, this.pos.x, 0);
            context.drawImage(this.image, this.pos.x + this.width(), 0);
        };

        Background.prototype.updates = function () {
            this.pos.x = (Math.abs(this.pos.x) >= this.width()) ? 0 : this.pos.x - this.speedy;
        };

        return Background;

    })();

    return background;

});