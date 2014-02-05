define([
    'jquery',
    
    'views/game/infrastructure/ImageLoader',

    'views/game/infrastructure/components/Component'
], function (
    $, 
    
    imageLoader,
     
    Component
) {

    function Sprite(config, entity, context) {
        this.config = config;
        this.entity = entity;
        this.context = context;

        var self = this;

        this.loaded = false;
        
        this.image = new Image();
        this.image.onload = function () {
            self.loaded = true;
        };
        
        imageLoader.load(config.src, function(base64) {
            self.image.src = base64;
        });
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
            this.config.width,
            this.config.height,
            this.entity.pos.x,
            this.entity.pos.y,
            this.entity.config.width,
            this.entity.config.height
        );
    };

    Sprite.prototype.row = function () {
        return this.entity.sprite.row * this.config.height;
    };

    Sprite.prototype.col = function () {
        return this.entity.sprite.col * this.config.width;
    };

    return Sprite;

});