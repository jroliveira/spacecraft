(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define([], function() {
    var Background;
    return Background = (function() {

      Background.prototype.pos = {
        x: 0
      };

      function Background(imageName, speedy) {
        this.speedy = speedy;
        this.updates = __bind(this.updates, this);

        this.image = new Image;
        this.image.src = "/src/app/img/" + imageName + ".png";
      }

      Background.prototype.updates = function() {
        return this.pos.x -= (Math.abs(this.pos.x)) >= this.image.width ? this.speedy : 0;
      };

      return Background;

    })();
  });

}).call(this);
