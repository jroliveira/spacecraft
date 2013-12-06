define([
    'jquery',

    'infrastructure/components/Component'
], function ($, Component) {

    function Img(entity, context) {
        this.entity = entity;
        this.context = context;

        this.image = new Image();
        this.image.src = entity.config.image;
    }

    Img.prototype = new Component();

    Img.prototype.draw = function () {
        this.context.drawImage(
            this.image,
            this.entity.pos.x,
            this.entity.pos.y
        );
    };

    return Img;

});