(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['underscore', 'domain/Background', 'domain/Nave', 'infrastructure/TimeManager'], function(_, Background, Nave, TimeManager) {
    var Game;
    return Game = (function() {

      function Game($canvas) {
        this.$canvas = $canvas;
        this.start = __bind(this.start, this);

        this.run = __bind(this.run, this);

        this.updates = __bind(this.updates, this);

        this.draw = __bind(this.draw, this);

        this.context = this.$canvas.getContext('2d');
        this.timeManager = new TimeManager();
        this.nave = new Nave;
        this.backgrounds = {
          bg1: new Background('bg1', 2.5),
          bg2: new Background('bg2', 10),
          bg3: new Background('bg3', 5)
        };
      }

      Game.prototype.draw = function() {
        var _this = this;
        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.context.drawImage(this.nave.image, this.nave.getRow(), this.nave.getCol(), this.nave.width, this.nave.height, this.nave.pos.x, this.nave.pos.y, this.nave.width * 2, this.nave.height * 2);
        return _.each(this.backgrounds, function(value, key) {
          _this.context.drawImage(value.image, value.pos.x, 0);
          return _this.context.drawImage(value.image, value.pos.x + value.image.width, 0);
        });
      };

      Game.prototype.updates = function() {
        var _this = this;
        this.nave.updates();
        _.each(this.backgrounds, function(value, key) {
          return value.updates();
        });
        return this.draw();
      };

      Game.prototype.run = function() {
        if (this.timeManager.canUpdate()) {
          this.updates();
        }
        return window.setTimeout(this.run(), 1000 / 60);
      };

      Game.prototype.start = function() {
        var _this = this;
        this.draw();
        this.run();
        return ($(document)).bind('keyup keydown', function(e) {
          e.preventDefault();
          switch (e.keyCode) {
            case 37:
              return _this.nave.left();
            case 38:
              return _this.nave.up();
            case 39:
              return _this.nave.right();
            case 40:
              return _this.nave.down();
          }
        });
      };

      return Game;

    })();
  });

}).call(this);
