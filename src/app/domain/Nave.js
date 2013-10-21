(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define([], function() {
    var Nave;
    return Nave = (function() {

      Nave.prototype.row = 0;

      Nave.prototype.col = 0;

      Nave.prototype.width = 43;

      Nave.prototype.height = 39;

      Nave.prototype.pos = {
        x: 0,
        y: 0
      };

      Nave.prototype.keys = {
        up: false,
        down: false,
        right: false,
        left: false
      };

      function Nave(context) {
        this.context = context;
        this.right = __bind(this.right, this);

        this.left = __bind(this.left, this);

        this.down = __bind(this.down, this);

        this.up = __bind(this.up, this);

        this.updates = __bind(this.updates, this);

        this.image = new Image;
        this.image.src = "/src/app/img/naveSprite.png";
      }

      Nave.prototype.getRow = function() {
        return this.row * this.width;
      };

      Nave.prototype.getCol = function() {
        return this.col * this.height;
      };

      Nave.prototype.updates = function() {
        if (this.keys.up) {
          this.pos.y -= 2;
        }
        if (this.keys.down) {
          this.pos.y += 2;
        }
        if (this.keys.left) {
          this.pos.x -= 2;
        }
        if (this.keys.right) {
          this.pos.x += 2;
        }
        return this.row = this.row === 2 ? 0 : this.row + 1;
      };

      Nave.prototype.up = function() {
        this.keys.up = !this.keys.up;
        return this.col = this.col <= 0 && this.keys.up ? 0 : this.col - 1;
      };

      Nave.prototype.down = function() {
        this.keys.down = !this.keys.down;
        return this.col = this.col >= 2 && this.keys.down ? 2 : this.col + 1;
      };

      Nave.prototype.left = function() {
        return this.keys.left = !this.keys.left;
      };

      Nave.prototype.right = function() {
        return this.keys.right = !this.keys.right;
      };

      return Nave;

    })();
  });

}).call(this);
