define [
    'jquery', 
    'domain/Game'
], ($, Game) ->

    initialize: () ->
        $canvas = ($ 'canvas')[0]
        
        game = new Game $canvas
        game.start()