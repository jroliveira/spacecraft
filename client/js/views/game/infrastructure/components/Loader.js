define([
    'views/game/infrastructure/components/Component'
], function (Component) {

    function Loader(context) {
        this.frameIndex = 0,
        this.tickCount = 0,
		this.ticksPerFrame = 4,
		this.numberOfFrames = 25;

        this.context = context;
        this.width = 2500;
        this.height = 100;

        this.image = new Image();
        this.image.src = "../../client/img/loadingSprite.png";
    }

    Loader.prototype = new Component();

    Loader.prototype.updates = function () {
        this.tickCount += 1;

        if (this.tickCount > this.ticksPerFrame) {

            this.tickCount = 0;

            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }
    };

    Loader.prototype.draw = function () {
        this.context.fillStyle = "#111111";
        this.context.fillRect(0, 0, 1170, 600);

        this.context.drawImage(
            this.image,
            this.frameIndex * this.width / this.numberOfFrames,
            0,
            this.width / this.numberOfFrames,
            this.height,
            (1170 - 100) / 2,
            (600 - 100) / 2,
            this.width / this.numberOfFrames,
            this.height);
    };

    return Loader;

});