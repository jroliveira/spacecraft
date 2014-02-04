define([
    'jquery',

    'views/game/infrastructure/components/Component'
], function ($, Component) {

    function Img(config, entity, context) {
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

    Img.prototype = new Component();

    Img.prototype.draw = function () {
        if (this.loaded === false) {
            return;
        }
        
        this.context.drawImage(this.image, this.entity.pos.x, this.entity.pos.y);
    };

    return Img;

});