(function() {

  define(['jquery', 'domain/Game'], function($, Game) {
    return {
      initialize: function() {
        var $canvas, game;
        $canvas = ($('canvas'))[0];
        game = new Game($canvas);
        return game.start();
      }
    };
  });

}).call(this);
