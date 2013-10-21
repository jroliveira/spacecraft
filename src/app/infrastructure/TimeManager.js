(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define([], function() {
    var TimeManager;
    return TimeManager = (function() {

      function TimeManager() {
        this.now = __bind(this.now, this);

        this.canUpdate = __bind(this.canUpdate, this);

        var current, last;
        last = new Date().getTime();
        current = new Date().getTime();
      }

      TimeManager.prototype.canUpdate = function() {
        if ((this.current - this.last) < 201) {
          return false;
        } else {
          this.last = this.current;
          return true;
        }
      };

      TimeManager.prototype.now = function() {
        return this.current = new Date().getTime();
      };

      return TimeManager;

    })();
  });

}).call(this);
