define([], function () {

    var background = (function () {

        function Background(imageName, speedy) {
            this.speedy = speedy;
            this.pos = {
                x: 0
            };

            this.image = new Image();
            this.image.src = "../../client/img/" + imageName + ".png";
        }

        Background.prototype.draw = function(context) {
            context.drawImage(this.image, this.pos.x, 0);
            context.drawImage(this.image, this.pos.x + this.image.width, 0);
        };

        Background.prototype.updates = function () {
            this.pos.x = (Math.abs(this.pos.x) >= this.image.width) ? 0 : this.pos.x - this.speedy;
        };

        return Background;

    })();

    return background;

});