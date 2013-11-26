define([
    'jquery'
], function ($) {

    function Background(config) {
        this.config = config;

        this.pos = config.pos;
        
        this.image = new Image();
        this.image.src = "../../client/img/scenarios/" + config.image.name + ".png";
    }

    Background.prototype.draw = function (context) {
        context.drawImage(this.image, this.pos.x, 0);
        context.drawImage(this.image, this.pos.x + this.config.width, 0);
    };

    Background.prototype.updates = function () {
        if ((Math.abs(this.pos.x) + this.config.canvas.width) < this.config.width) {
            this.pos.x = this.pos.x - this.config.speed;
        } else {
            $(this).trigger('scenarioEnded');
        }
    };

    return Background;

});