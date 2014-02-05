define([
    'jquery',
    
    'views/game/infrastructure/ImageLoader',

    'views/game/infrastructure/components/Component'
], function (
    $, 
    
    imageLoader,
     
    Component
) {

    function Img(config, entity, context) {
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

    Img.prototype = new Component();

    Img.prototype.draw = function () {
        if (this.loaded === false) {
            return;
        }
        
        this.context.drawImage(this.image, this.entity.pos.x, this.entity.pos.y);
    };

    return Img;

});