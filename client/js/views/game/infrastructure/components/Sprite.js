define([
    'jquery',

    'views/game/infrastructure/components/Component'
], function ($, Component) {

    function Sprite(entity, context) {
        this.entity = entity;
        this.context = context;

        var self = this;

        this.loaded = false;
        
        this.image = new Image();
        this.image.onload = function () {
            self.loaded = true;
        };
        this.image.src = entity.config.image.src;
    }

    Sprite.prototype = new Component();

    Sprite.prototype.draw = function () {
        if (this.loaded === false) {
            return;
        }
        
        this.context.drawImage(
            this.image,
            this.col(),
            this.row(),
            this.entity.config.image.width,
            this.entity.config.image.height,
            this.entity.pos.x,
            this.entity.pos.y,
            this.entity.config.width,
            this.entity.config.height
        );
    };

    Sprite.prototype.row = function () {
        return this.entity.sprite.row * this.entity.config.image.height;
    };

    Sprite.prototype.col = function () {
        return this.entity.sprite.col * this.entity.config.image.width;
    };

    return Sprite;

});