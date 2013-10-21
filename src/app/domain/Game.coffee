define [
    'underscore',

    'domain/Background',
    'domain/Nave',

    'infrastructure/TimeManager'
], (_, Background, Nave, TimeManager) ->

    class Game
        constructor: (@$canvas) ->
            @context = @$canvas.getContext '2d'

            @timeManager = new TimeManager()

            @nave = new Nave
            @backgrounds = {
                bg1: new Background 'bg1', 2.5
                bg2: new Background 'bg2', 10
                bg3: new Background 'bg3', 5
            }

        draw: () =>
            @context.clearRect 0, 0, @$canvas.width, @$canvas.height

            @context.drawImage @nave.image, @nave.getRow(), @nave.getCol(), @nave.width, @nave.height, @nave.pos.x, @nave.pos.y, @nave.width * 2, @nave.height * 2
            _.each @backgrounds, (value, key) =>
                @context.drawImage value.image, value.pos.x, 0
                @context.drawImage value.image, value.pos.x + value.image.width, 0

        updates: () =>
            @nave.updates()
            _.each @backgrounds, (value, key) =>
                value.updates()
            @draw()

        run: () =>
            @updates() if @timeManager.canUpdate()
            window.setTimeout @run(), 1000/60

        start: () =>
            @draw()
            @run()

            ($ document).bind 'keyup keydown', (e) =>
                e.preventDefault();
        
                switch e.keyCode
                    when 37 then @nave.left()
                    when 38 then @nave.up()
                    when 39 then @nave.right()
                    when 40 then @nave.down()