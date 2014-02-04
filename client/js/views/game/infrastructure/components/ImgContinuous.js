define([
    'jquery',

    'views/game/infrastructure/components/Component'
], function ($, Component) {

    function ImgContinuous(config, entity, context) {
        this.entity = entity;
        this.context = context;

        var self = this;

        this.loaded = false;

        this.image = new Image();
        this.image.onload = function () {
            self.loaded = true;
        };
        this.image.src = config.src;
    }

    ImgContinuous.prototype = new Component();

    ImgContinuous.prototype.draw = function () {
        if (this.loaded === false) {
            return;
        }
        
        this.context.drawImage(this.image, this.entity.pos.x, 0);
        this.context.drawImage(this.image, this.entity.pos.x + this.entity.config.width, 0);
    };

    return ImgContinuous;

});