define([
    'jquery',

    'infrastructure/components/Component'
], function ($, Component) {

    function ImgContinuous(entity, context) {
        this.entity = entity;
        this.context = context;

        this.image = new Image();
        this.image.src = entity.config.image;
    }

    ImgContinuous.prototype = new Component();

    ImgContinuous.prototype.draw = function () {
        this.context.drawImage(this.image, this.pos.x, 0);
        this.context.drawImage(this.image, this.pos.x + this.config.width, 0);
    };

    return ImgContinuous;

});